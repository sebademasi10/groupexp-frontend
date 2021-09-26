import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediosMovilidadResolver } from 'src/app/resolvers/medios-movilidad.resolver';
import { OrganizarComponent } from './organizar/organizar.component';
import { ParticiparComponent } from './participar/participar.component';

const routes: Routes = [
  {
    path: 'participar',
    component: ParticiparComponent,
    resolve: { MediosMovilidadResolver }
  },
  {
    path: 'organizar',
    component: OrganizarComponent,
    resolve: { MediosMovilidadResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadRoutingModule { }
