import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    private storageSubject=new Subject<string>();
    
    
    public setItem(key:string, value:any){
        localStorage.setItem(key,value);
        this.storageSubject.next('added');        
    }
    public getItem(key:string){
        return localStorage.getItem(key);        
    }

    public removeItem(key:string){
        localStorage.removeItem(key);
        this.storageSubject.next('removed');
    }

    watchStorage(): Observable<any> {
        return this.storageSubject.asObservable();
      }
}
