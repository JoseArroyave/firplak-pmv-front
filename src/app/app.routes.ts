import { Routes } from '@angular/router';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { GuiasComponent } from './components/guias/guias.component';
import { PodComponent } from './components/pod/pod.component';

export const routes: Routes = [
  // { path: "", component: InicioComponent, title: "Inicio" },
  // { path: "Inicio", component: InicioComponent, title: "Inicio" },
  { path: "Pedidos", component: PedidosComponent, title: "Pedidos" },
  { path: "Guias", component: GuiasComponent, title: "Guias" },
  { path: "POD/:id", component: PodComponent, title: "POD" },
  { path: "**", redirectTo: 'Pedidos', pathMatch: 'full' },
  { path: "", redirectTo: 'Pedidos', pathMatch: 'full' },
];
