import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    private form: FormGroup;
    private status;any;

    constructor(private fb: FormBuilder,
        private eventSvc: EventService) { }

    ngOnInit() {
        this.form = this.fb.group({
            "title": ["", Validators.required,],
            "location": ["", Validators.required],
            "startDate": ["", Validators.required],
            "endDate": ["", Validators.required],
            "speaker": ["", Validators.required],
            "url": ["",Validators.required]
        })
    }

    get controls(){ return this.form.controls; }
    
    submit() {        
        if (this.form.valid) {
            this.eventSvc.addEvent(this.form.value)
                .subscribe(
                    result => {
                        this.status={ success:true, message:"New event is added successfully."}
                    },
                    err => {                         
                        this.status = {
                            success: false,
                            message:"Failed to add new event data."
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
