import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediosMovilidadResolver } from 'src/app/resolvers/medios-movilidad.resolver';
import { MediosMovilidadComponent } from './medios-movilidad.component';

const routes: Routes = [
  {
    path: 'medios-movilidad',
    component: MediosMovilidadComponent,
    resolve: { MediosMovilidadResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediosMovilidadRoutingModule { }
