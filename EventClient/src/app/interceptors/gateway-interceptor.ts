import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayInterceptor implements HttpInterceptor {
    
    apiSubscriptionKey:string="<Your product subscription key>";

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq= req.clone({
            setHeaders:{
                "Ocp-Apim-Subscription-Key":this.apiSubscriptionKey
            }
        });
        return next.handle(newReq)
    }

  
}
