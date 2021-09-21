import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediosMovilidadComponent } from './medios-movilidad.component';

const routes: Routes = [
  {
    path: 'medios-movilidad',
    component: MediosMovilidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediosMovilidadRoutingModule { }
