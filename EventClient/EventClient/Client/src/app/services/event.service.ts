import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { EventData } from '../models/event-data';
import { ConfigurationService } from './configuration.service';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private APIURL:string;

    constructor(private http: HttpClient, private configSvc:ConfigurationService) { 
        this.APIURL= this.configSvc.configuration.eventApiUrl;
    }

    public getEvents():Observable<EventData[]>{        
        return this.http.get<EventData[]>(`${this.APIURL}/api/events`);
    }

    public addEvent(event:EventData):Observable<EventData>{
        return this.http.post<EventData>(`${this.APIURL}/api/events`, event,{
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        } )
    }
}
