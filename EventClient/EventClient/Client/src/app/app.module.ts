import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthIntercepter } from './interceptors/auth-intercepter';
import { ConfigurationService } from './services/configuration.service';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddEventComponent } from './components/add-event/add-event.component';


export function initializeAppConfig(configService: ConfigurationService) {
    return ():Promise<any> => { 
        return configService.loadSettings();
    }
}


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
        { provide: APP_INITIALIZER, useFactory: initializeAppConfig, deps: [ConfigurationService], multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
