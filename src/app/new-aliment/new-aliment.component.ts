import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, AbstractControl, Validators, FormControl } from '@angular/forms';
import { NgSwitch } from '@angular/common';
import { Router } from '@angular/router';

const ICON_ARRAY: any = require('../iconList.json');
const INPUT_PAGES: String[] = ['icon', 'name', 'category', 'storedDate', 'expirationDate', 'quantity']

@Component({
  selector: 'app-new-aliment',
  templateUrl: './new-aliment.component.html',
  styleUrls: ['./new-aliment.component.scss']
})
export class NewAlimentComponent implements OnInit {

  alimentForm: FormGroup;
  currentInputPage: {value:String, index:number} = {value: INPUT_PAGES[0], index: 0};
  iconList: String[] = ICON_ARRAY;

  constructor(private router: Router, fb: FormBuilder) {
    this.alimentForm = fb.group({
        name: fb.control('', [Validators.required, Validators.maxLength(250)]),
        icon: fb.control('', [Validators.required, Validators.maxLength(250)]),
        category: fb.control('', [Validators.required, Validators.maxLength(250)]),
        storedDate: fb.control('', [Validators.required, Validators.maxLength(250)]),
        expirationDate: fb.control('', [Validators.required, Validators.maxLength(250)]),
        quantityValue: fb.control('', [Validators.required, Validators.maxLength(250), this.validateNumber]),
        quantityUnit: fb.control('', [Validators.required, Validators.maxLength(250)])
    });
  }

  previousFromControl() {
    let tabSize = INPUT_PAGES.length;
    this.currentInputPage.index = ( this.currentInputPage.index - 1 + tabSize ) % tabSize;
    this.currentInputPage.value = INPUT_PAGES[this.currentInputPage.index];
  }

  nextFormControl() {
    let tabSize = INPUT_PAGES.length;
    this.currentInputPage.index = ( this.currentInputPage.index + 1 ) % tabSize;
    this.currentInputPage.value = INPUT_PAGES[this.currentInputPage.index];
  }

  setCurrentFormControl(value: String) {
    if(! INPUT_PAGES.includes(value)) {
      this.currentInputPage = {value: INPUT_PAGES[0], index: 0};
    }
    else {
      this.currentInputPage.value = value;
      this.currentInputPage.index = INPUT_PAGES.findIndex((elem) => elem == value);
    }
  }

  register() {
      console.log('test', this.alimentForm.get('toto'));
  }

  validateNumber(control: FormControl): { [s: string]: boolean } {
    // check to see if the control value is not a number
    if (isNaN(control.value)) {
      return { 'NaN': true };
    }
    return null;
  }

  isShowingInvalid(formControlName: string): Boolean {
    let formControl:AbstractControl = null;

    if(this.alimentForm) {
      formControl = this.alimentForm.get(formControlName);
      if(formControl && formControl.dirty) {
        return formControl.invalid;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  iconToDisplayLine(lineName: string): string {
    let formControl:AbstractControl = null;

    if(lineName == 'quantity') {
      let valueStatus: string = this.iconToDisplayField('quantityValue');
      let valueUnit: string = this.iconToDisplayField('quantityUnit');

      if(valueStatus == 'INVALID' || valueUnit == 'INVALID') {
        return 'INVALID';
      }
      else if(valueStatus == 'EDIT' || valueUnit == 'EDIT') {
        return 'EDIT';
      }
      else {
        return 'VALID';
      }
    }
    else {
      return this.iconToDisplayField(lineName);
    }
  }

  iconToDisplayField(formControlName: string): string {
    let formControl:AbstractControl = null;
    formControl = this.alimentForm.get(formControlName);
    if(formControl && formControl.dirty) {
      return formControl.status;
    }
    else {
      return 'EDIT';
    }
  }

  setIcon(iconName: string): void {
    let iconFormControl: AbstractControl = this.alimentForm.get('icon');
    iconFormControl.setValue(iconName);
    iconFormControl.markAsDirty();
  }

  ngOnInit() {
  }

}
