import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    loggedIn: boolean;

    constructor(private authSvc: AuthService, private router:Router) {
        this.authSvc.isLoggedIn()
            .subscribe(res => 
                {                    
                    this.loggedIn = res;
                });

    }

    logout(){
        this.authSvc.logOut();
        return this.router.navigate(['/'])
    }
}
