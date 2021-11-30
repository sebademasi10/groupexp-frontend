import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

@Component({
  selector: 'app-running',
  templateUrl: './running.modal.html',
  styleUrls: ['./running.modal.scss']
})
export class RunningModal implements OnInit {

  public formBuilder: FormBuilder;
  public xpLevels = ExpLevelEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
