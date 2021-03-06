import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, AbstractControl, Validators, FormControl } from '@angular/forms';
import { NgSwitch } from '@angular/common';
import { Router } from '@angular/router';
import { Aliment } from '../Class/Aliment';
import { DataService } from '../Services/data.service';
import { BackendService } from '../Services/backend.service';

import { DatePipe } from '@angular/common';

const ICON_ARRAY: any = require('../iconList.json');
const INPUT_PAGES: String[] = ['icon', 'name', 'category', 'storedDate', 'expirationDate', 'quantity']

@Component({
	selector: 'app-new-aliment',
	templateUrl: './new-aliment.component.html',
	styleUrls: ['./new-aliment.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class NewAlimentComponent implements OnInit {

	alimentForm: FormGroup;
	currentInputPage: { value: String, index: number } = { value: INPUT_PAGES[0], index: 0 };
	iconList: String[] = ICON_ARRAY;
	isEdit: Boolean = this.router.url == '/edit-aliment';

	constructor(public router: Router, fb: FormBuilder, private dataService: DataService) {
		this.alimentForm = fb.group({
			name: fb.control('', [Validators.required, Validators.maxLength(250)]),
			icon: fb.control('', [Validators.required, Validators.maxLength(250)]),
			category: fb.control('', [Validators.required, Validators.maxLength(250)]),
			storedDate: fb.control('', [Validators.required, Validators.maxLength(250)]),
			expirationDate: fb.control('', [Validators.required, Validators.maxLength(250)]),
			quantityValue: fb.control('', [Validators.required, Validators.maxLength(250), this.validateNumber]),
			quantityUnit: fb.control('', [Validators.required, Validators.maxLength(250)]),
			id: fb.control('', [this.isEdit ? Validators.required : Validators.nullValidator, Validators.maxLength(250), this.validateNumber])
		});
		if (this.isEdit) {
			let defaultAlim = this.dataService.alimentToEdit;
			if (defaultAlim) {
				this.alimentForm.setValue({
					name: defaultAlim.name,
					icon: defaultAlim.iconicFontName,
					category: defaultAlim.category,
					storedDate: defaultAlim.storedDate,
					expirationDate: defaultAlim.expirationDate,
					quantityValue: defaultAlim.quantity,
					quantityUnit: defaultAlim.quantityUnit,
					id: defaultAlim.id
				});
			}
			else {
				this.router.navigate(['']);
			}
		}
	}

	previousFromControl() {
		let tabSize = INPUT_PAGES.length;
		this.currentInputPage.index = (this.currentInputPage.index - 1 + tabSize) % tabSize;
		this.currentInputPage.value = INPUT_PAGES[this.currentInputPage.index];
	}

	nextFormControl() {
		let tabSize = INPUT_PAGES.length;
		this.currentInputPage.index = (this.currentInputPage.index + 1) % tabSize;
		this.currentInputPage.value = INPUT_PAGES[this.currentInputPage.index];
	}

	setCurrentFormControl(value: String) {
		if (!INPUT_PAGES.includes(value)) {
			this.currentInputPage = { value: INPUT_PAGES[0], index: 0 };
		}
		else {
			this.currentInputPage.value = value;
			this.currentInputPage.index = INPUT_PAGES.findIndex((elem) => elem == value);
		}
	}

	register() {
		if (this.alimentForm.valid) {
			let formVal = this.alimentForm.value;
			let alimForm: Aliment = new Aliment(formVal.name, formVal.category, formVal.icon, formVal.quantityValue, formVal.quantityUnit, formVal.storedDate, formVal.expirationDate);
			if (this.isEdit) {
				alimForm.id = formVal.id;
				this.dataService.editAliment(alimForm);
			}
			else {
				this.dataService.addAliment(alimForm);
			}
			this.router.navigate(['']);
		}
		else {
			this.alimentForm.controls;
			for (var controlFormName in this.alimentForm.controls) {
				this.alimentForm.get(controlFormName).markAsDirty();
			}
		}
	}

	validateNumber(control: FormControl): { [s: string]: boolean } {
		// check to see if the control value is not a number
		if (isNaN(control.value)) {
			return { 'NaN': true };
		}
		return null;
	}

	isShowingInvalid(formControlName: string): Boolean {
		let formControl: AbstractControl = null;

		if (this.alimentForm) {
			formControl = this.alimentForm.get(formControlName);
			if (formControl && formControl.dirty) {
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
		let formControl: AbstractControl = null;

		if (lineName == 'quantity') {
			let valueStatus: string = this.iconToDisplayField('quantityValue');
			let valueUnit: string = this.iconToDisplayField('quantityUnit');

			if (valueStatus == 'INVALID' || valueUnit == 'INVALID') {
				return 'INVALID';
			}
			else if (valueStatus == 'EDIT' || valueUnit == 'EDIT') {
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
		let formControl: AbstractControl = null;
		formControl = this.alimentForm.get(formControlName);
		if (formControl && formControl.dirty) {
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
