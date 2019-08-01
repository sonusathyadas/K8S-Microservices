import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Observable } from 'rxjs';
import { EventData } from 'src/app/models/event-data';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    events:Observable<EventData[]>;

    constructor(private eventSvc: EventService) { }

    ngOnInit() {
        this.events=this.eventSvc.getEvents();
    }

}
