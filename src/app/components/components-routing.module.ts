import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticiparComponent } from './actividad/participar/participar.component';

const routes: Routes = [
  {
    path: 'home',
    component: ParticiparComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
