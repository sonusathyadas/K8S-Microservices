import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private APIURL: string;
    private loggedIn: boolean = false;
    private subject: BehaviorSubject<boolean>;

    constructor(private configSvc: ConfigurationService,
        private http: HttpClient,
        private storageSvc: StorageService) {

        this.APIURL = this.configSvc.configuration.identityApiUrl;
        this.subject = new BehaviorSubject<boolean>(this.loggedIn);        

        if (this.storageSvc.getItem('auth-token')){
            this.loggedIn = true;
            this.subject.next(this.loggedIn);
        }

        this.storageSvc.watchStorage()
            .subscribe(data => {
                if (data === 'removed')
                    this.loggedIn = false;
                else if (data === 'added')
                    this.loggedIn = true;
                this.subject.next(this.loggedIn);
            });


    }

    public getToken(login: any): Observable<string> {
        return this.http.post<string>(`${this.APIURL}/api/identity/token`, login, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });
    }

    public register(user: any): Observable<any> {
        return this.http.post<any>(`${this.APIURL}/api/identity/register`, user, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });
    }

    public isLoggedIn(): Observable<boolean> {
        return this.subject;
        //return of (this.loggedIn);        
    }

    public logOut() {
        this.storageSvc.removeItem("auth-token");
    }

}
