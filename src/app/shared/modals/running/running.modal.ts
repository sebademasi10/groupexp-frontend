import { Component, OnInit } from '@angular/core';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

@Component({
  selector: 'app-running',
  templateUrl: './running.modal.html',
  styleUrls: ['./running.modal.scss']
})
export class RunningModal implements OnInit {

  public xpLevels = ExpLevelEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
