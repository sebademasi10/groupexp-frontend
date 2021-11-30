import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

@Component({
  selector: 'app-walking',
  templateUrl: './walking.modal.html',
  styleUrls: ['./walking.modal.scss']
})
export class WalkingModal implements OnInit {

  public formBuilder: FormBuilder;
  public xpLevels = ExpLevelEnum;
  public walkingForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.walkingForm = this.formBuilder.group({
      xpLevel: [this.xpLevels]
    })
  }

  selectionChanged(event) {
    console.log('cambio', event);
    console.log(this.walkingForm.controls.xpLevel.value);
  }

}
