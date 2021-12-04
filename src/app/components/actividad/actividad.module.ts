import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ParticiparComponent } from './participar/participar.component';
import { OrganizarComponent } from './organizar/organizar.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { GraficosComponent } from './graficos/graficos.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ParticiparComponent,
    OrganizarComponent,
    ActivityDetailComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    ChartsModule
  ]
})
export class ActividadModule { }
