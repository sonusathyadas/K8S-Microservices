import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private form: FormGroup;
    private status: any;

    constructor(private fb: FormBuilder,
        private authSvc: AuthService) { }

    ngOnInit() {
        this.form = this.fb.group({
            "firstName": ["", Validators.required,],
            "lastName": ["", Validators.required],
            "email": ["", Validators.compose([Validators.required, Validators.email])],
            "password": ["", Validators.required],
            "contactNo": ["", Validators.required]
        })
    }

    get controls() {return this.form.controls}
    
    submit() {
        if (this.form.valid) {
            this.authSvc.register(this.form.value)
                .subscribe(
                    result => {
                        this.status = { success: true, message: "You have registered successfully" };
                    },
                    err => {
                    this.status = {
                        success: false,
                        message:"Registration process failed, some error occured"
                    }
                    }
                )
        } else {
            this.status={ success:false, message:"Invalid user details."};
        }
    }

}
