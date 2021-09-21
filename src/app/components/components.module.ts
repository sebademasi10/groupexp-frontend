import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContactosModule } from './contactos/contactos.module';
import { MediosMovilidadModule } from './medios-movilidad/medios-movilidad.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ContactosModule,
    MediosMovilidadModule
  ]
})
export class ComponentsModule { }
