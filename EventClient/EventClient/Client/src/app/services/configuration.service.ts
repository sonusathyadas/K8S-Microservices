import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfiguration } from '../models/configuration';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    configuration: IConfiguration;
    
    constructor(private http: HttpClient) { }

    loadSettings(): Promise<any> {
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        let url = `${baseURI}api/settings`;
        return this.http.get<IConfiguration>(url)
            .toPromise()
            .then(resp => this.configuration = resp);
    }
    
}