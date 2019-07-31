import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfiguration } from '../models/configuration';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    configuration: IConfiguration;
<<<<<<< HEAD

=======
    
>>>>>>> a02995eb2724286f928d6e75a9137507aed8c1d0
    constructor(private http: HttpClient) { }

    loadSettings(): Promise<any> {
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        let url = `${baseURI}api/settings`;
        return this.http.get<IConfiguration>(url)
            .toPromise()
<<<<<<< HEAD
            .then(resp => {
                this.configuration = resp;
                console.log(resp)
            });
    }

=======
            .then(resp => this.configuration = resp);
    }
    
>>>>>>> a02995eb2724286f928d6e75a9137507aed8c1d0
}