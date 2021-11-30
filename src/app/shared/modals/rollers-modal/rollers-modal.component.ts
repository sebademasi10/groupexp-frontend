import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rollers-modal',
  templateUrl: './rollers-modal.component.html',
  styleUrls: ['./rollers-modal.component.scss']
})
export class RollersModalComponent implements OnInit {

  public formBuilder: FormBuilder;
  constructor() { }

  ngOnInit(): void {
  }

}
