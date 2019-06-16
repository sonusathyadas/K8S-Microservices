import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let newReq= req.clone({
            setHeaders:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });

        let token = localStorage.getItem("auth-token") || undefined;
        if (token) {
            var request = newReq.clone({
                setHeaders:{"Authorization":`Bearer ${token}`},
                //headers: req.headers.set("Authorization", `Bearer ${token}`)
            });
            return next.handle(request);
        }
        return next.handle(newReq)
    }
}
