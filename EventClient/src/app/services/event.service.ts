import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { EventData } from '../models/event-data';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private API_BASE_URL:string="<Your api gateway URL for event service>";

    constructor(private http: HttpClient) {         
    }

    public getEvents():Observable<EventData[]>{        
        return this.http.get<EventData[]>(`${this.API_BASE_URL}/api/events`);
    }

    public addEvent(event:EventData):Observable<EventData>{
        console.log(`Event data:`, event);
        return this.http.post<EventData>(`${this.API_BASE_URL}/api/events`, event,{
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        } )
    }
}
