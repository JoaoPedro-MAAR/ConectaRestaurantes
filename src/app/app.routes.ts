import { Routes } from '@angular/router';
import { FormComponentComponent } from './form-component/form-component.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterListPageComponent } from './components/register-list-page/register-list-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { OrderVisualizationComponent } from './order-visualization/order-visualization.component';
import { MenuListPageComponent } from './menu-list-page/menu-list-page.component';
import { MenuVisualizationComponent } from './menu-visualization/menu-visualization.component';
import { RegistroPresencialComponent } from './registro-presencial/registro-presencial.component';
import { SolicitacaoPedidosComponent } from './solicitacao-pedidos/solicitacao-pedidos.componet';
import { RelatorioComponent } from './relatorio/relatorio.component';

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
    { path: 'solicitacao/:id/pedidos', component: SolicitacaoPedidosComponent },
    { path: 'relatorio', component: RelatorioComponent },
    {path:'**', component: NotFoundPageComponent},


    
];
