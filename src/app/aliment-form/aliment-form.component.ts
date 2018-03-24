import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControlName, AbstractControl } from '@angular/forms';
const ICON_ARRAY: any = require('../iconList.json');

@Component({
  selector: 'app-aliment-form',
  templateUrl: './aliment-form.component.html',
  styleUrls: ['./aliment-form.component.scss']
})
export class AlimentFormComponent implements OnInit {

  @Output()
  abortCreation = new EventEmitter();

  userForm: FormGroup;
  currentFormControlName: String;

  iconList: String[] = ICON_ARRAY;

  constructor(private router: Router, fb: FormBuilder) {
    this.userForm = fb.group({
        username: '',
        password: ''
    });
  }

  previousFromControl() {
    this.currentFormControlName = 'password';

  }
  nextFormControl() {
    this.currentFormControlName = 'username';
  }

  register() {
      console.log(this.userForm.value);
  }



  ngOnInit() {
  }
}
