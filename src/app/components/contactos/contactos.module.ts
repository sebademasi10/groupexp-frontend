import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactosRoutingModule } from './contactos-routing.module';

import { ContactosComponent } from './contactos.component';

@NgModule({
  declarations: [
    ContactosComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ContactosModule { }
