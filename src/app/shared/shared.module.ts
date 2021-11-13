import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BicycleModalComponent } from './modals/bicycle-modal/bicycle-modal.component';
import { MaterialModule } from './material.module';
import { RollersModalComponent } from './modals/rollers-modal/rollers-modal.component';
import { MotorcycleModalComponent } from './modals/motorcycle-modal/motorcycle-modal.component';
import { CarModalComponent } from './modals/car-modal/car-modal.component';


@NgModule({
  declarations: [
    BicycleModalComponent,
    RollersModalComponent,
    MotorcycleModalComponent,
    CarModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
