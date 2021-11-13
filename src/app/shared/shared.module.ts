import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BicycleModalComponent } from './modals/bicycle-modal/bicycle-modal.component';
import { MaterialModule } from './material.module';
import { CarComponent } from './modals/car/car.component';
import { MotorcycleComponent } from './modals/motorcycle/motorcycle.component';
import { RollersComponent } from './modals/rollers/rollers.component';



@NgModule({
  declarations: [

    BicycleModalComponent,
      CarComponent,
      MotorcycleComponent,
      RollersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
