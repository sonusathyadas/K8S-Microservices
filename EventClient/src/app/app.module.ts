import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthIntercepter } from './interceptors/auth-intercepter';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { GatewayInterceptor } from './interceptors/gateway-interceptor';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NotFoundComponent,
        AddEventComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: GatewayInterceptor, multi: true }        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
