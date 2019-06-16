import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddEventComponent } from './components/add-event/add-event.component';

const routes: Routes = [
    { path:"", component:HomeComponent},
    { path:"events/new", component:AddEventComponent},
    { path:"login" , component:LoginComponent},    
    { path:"register", component:RegisterComponent},
    { path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
