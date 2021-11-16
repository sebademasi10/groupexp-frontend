import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityResolver } from 'src/app/resolvers/activity.resolver';
import { MediosMovilidadResolver } from 'src/app/resolvers/medios-movilidad.resolver';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
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
    resolve: { MediosMovilidadResolver },
    data: {
      isOrganizar: true
    }
  },
  {
    path: 'ver/:uid',
    component: ActivityDetailComponent,
    resolve: {
      ActivityResolver,
      MediosMovilidadResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadRoutingModule { }
