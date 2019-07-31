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

<<<<<<< HEAD
    constructor(private http: HttpClient, private configSvc:ConfigurationService) {         
=======
    constructor(private http: HttpClient, private configSvc:ConfigurationService) { 
>>>>>>> a02995eb2724286f928d6e75a9137507aed8c1d0
        this.APIURL= this.configSvc.configuration.eventApiUrl;
    }

    public getEvents():Observable<EventData[]>{        
<<<<<<< HEAD
        //console.log(`GET ${this.configSvc.configuration.eventApiUrl}/api/events`);
=======
>>>>>>> a02995eb2724286f928d6e75a9137507aed8c1d0
        return this.http.get<EventData[]>(`${this.APIURL}/api/events`);
    }

    public addEvent(event:EventData):Observable<EventData>{
<<<<<<< HEAD
        //console.log(`POST ${this.configSvc.configuration.eventApiUrl}/api/events`);
        console.log(`Event data:`, event);
=======
>>>>>>> a02995eb2724286f928d6e75a9137507aed8c1d0
        return this.http.post<EventData>(`${this.APIURL}/api/events`, event,{
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        } )
    }
}
