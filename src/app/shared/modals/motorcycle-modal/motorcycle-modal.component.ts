import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-motorcycle-modal',
  templateUrl: './motorcycle-modal.component.html',
  styleUrls: ['./motorcycle-modal.component.scss']
})
export class MotorcycleModalComponent implements OnInit {

  public formBuilder: FormBuilder;
  constructor() { }

  ngOnInit(): void {
  }

}
