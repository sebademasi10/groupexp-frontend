import { Component, OnInit } from '@angular/core';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

@Component({
  selector: 'app-walking',
  templateUrl: './walking.modal.html',
  styleUrls: ['./walking.modal.scss']
})
export class WalkingModal implements OnInit {

  public xpLevels = ExpLevelEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
