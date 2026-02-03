import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterListPageComponent } from './components/register-list-page/register-list-page.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { MenuListPageComponent } from './menu-list-page/menu-list-page.component';
import { MenuVisualizationComponent } from './menu-visualization/menu-visualization.component';
import { OrderVisualizationComponent } from './order-visualization/order-visualization.component';
import { RegistroPresencialComponent } from './registro-presencial/registro-presencial.component';
import { ItemListComponent } from './item-component/item-list.component';    
import { ItemFormComponent } from './item-component/item-form.component';
import { PratoFeitoFormComponent } from './prato-feito-component/prato-feito-form.component';
import { PratoFeitoListComponent } from './prato-feito-component/prato-feito-list.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent },
    {path:'register', component:FormComponentComponent },
    {path: 'orders', component:ListOrderComponent },
    {path:'list', component:RegisterListPageComponent},
    {path: 'order/:id', component: OrderVisualizationComponent }, 
    {path: `menu`, component: MenuListPageComponent},
    {path : "menu/:id", component: MenuVisualizationComponent},
    {path: 'menu/new', component: MenuVisualizationComponent},
    {path: 'registro-presencial', component: RegistroPresencialComponent },
    { path: 'itens', component: ItemListComponent },
    { path: 'itens/novo', component: ItemFormComponent },
    { path: 'itens/editar/:id', component: ItemFormComponent },
    { path: 'pratos-feitos', component: PratoFeitoListComponent },
    { path: 'pratos-feitos/novo', component: PratoFeitoFormComponent },
    {path:'**', component: NotFoundPageComponent}


    
];
