import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private form: FormGroup;
    private status:any;

    constructor(private fb: FormBuilder,
        private authSvc: AuthService,
        private storageSvc:StorageService,
        private router: Router) { }

    ngOnInit() {
        this.form = this.fb.group({
            "email": ["", Validators.compose([Validators.required, Validators.email])],
            "password":["", Validators.required]
        });        
    }
    get controls() {return this.form.controls}

    submit() {        
        if (this.form.valid) {
            this.authSvc.getToken(this.form.value)
                .subscribe(
                    result => {                        
                        this.storageSvc.setItem("auth-token", result);
                        this.router.navigate(["/"]);
                    },
                    err => {                         
                        this.status = {
                            success: false,
                            message:"Login failed, invalid username/password"
                        }
                     }
                )
        } else {
            this.status = {
                success: false,
                message:"Invalid form data"
            }
        }
    }

}
