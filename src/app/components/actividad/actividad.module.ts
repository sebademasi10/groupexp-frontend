import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ParticiparComponent } from './participar/participar.component';
import { OrganizarComponent } from './organizar/organizar.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';


@NgModule({
  declarations: [
    ParticiparComponent,
    OrganizarComponent,
    ActivityDetailComponent
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class ActividadModule { }
