import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BicycleModalComponent } from './modals/bicycle-modal/bicycle-modal.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [

    BicycleModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
