import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MediosMovilidadRoutingModule } from './medios-movilidad-routing.module';

import { MediosMovilidadComponent } from './medios-movilidad.component';
@NgModule({
  declarations: [
    MediosMovilidadComponent
  ],
  imports: [
    CommonModule,
    MediosMovilidadRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MediosMovilidadModule { }
