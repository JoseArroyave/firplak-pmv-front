import { PedidosComponent } from './components/pedidos/pedidos.component';
import { GuiasComponent } from './components/guias/guias.component';
import { PodComponent } from './components/pod/pod.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "Pedidos", component: PedidosComponent, title: "Pedidos" },
  { path: "Guias", component: GuiasComponent, title: "Guias" },
  { path: "POD/:id", component: PodComponent, title: "POD" },
  { path: "**", redirectTo: 'Pedidos', pathMatch: 'full' },
  { path: "", redirectTo: 'Pedidos', pathMatch: 'full' },
];
