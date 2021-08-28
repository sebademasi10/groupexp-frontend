import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactosRoutingModule } from './contactos-routing.module';

import { AgregarComponent } from './agregar/agregar.component';

@NgModule({
  declarations: [
    AgregarComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ContactosModule { }
