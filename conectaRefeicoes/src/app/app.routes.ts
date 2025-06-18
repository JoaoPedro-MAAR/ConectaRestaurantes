import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterListPageComponent } from './components/register-list-page/register-list-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent },
    {path:'register', component:FormComponentComponent },
    {path: 'orders', component:ListOrderComponent },
    {path:'list', component:RegisterListPageComponent},
    {path:'**', component: NotFoundPageComponent}
    
];
