import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bicycle-modal',
  templateUrl: './bicycle-modal.component.html',
  styleUrls: ['./bicycle-modal.component.scss']
})
export class BicycleModalComponent implements OnInit {
  formBuilder: FormBuilder;

  constructor() { }

  ngOnInit(): void {
  }

}
