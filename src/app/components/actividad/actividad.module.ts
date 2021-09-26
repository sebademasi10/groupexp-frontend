import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ParticiparComponent } from './participar/participar.component';
import { OrganizarComponent } from './organizar/organizar.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ParticiparComponent,
    OrganizarComponent
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ActividadModule { }
