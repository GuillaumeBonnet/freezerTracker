import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, AbstractControl, Validators, FormControl } from '@angular/forms';
import { NgSwitch } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Aliment } from '../Class/Aliment';
import { DataService } from '../Services/data.service';
import { DatePipe } from '@angular/common';
import { Observable, PartialObserver } from 'rxjs';

const ICON_ARRAY: any = require('../iconList.json');
const INPUT_PAGES: string[] = ['icon', 'name', 'category', 'storedDate', 'expirationDate', 'quantity']

@Component({
	selector: 'app-new-aliment',
	templateUrl: './new-aliment.component.html',
	styleUrls: ['./new-aliment.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class NewAlimentComponent implements OnInit {

	alimentForm: FormGroup;
	currentInputPage: { value: string, index: number } = { value: INPUT_PAGES[0], index: 0 };
	iconList: string[] = ICON_ARRAY;
	freezerId: number;

	// Edit variables
	@Input()
	isEdit: Boolean = false;
	alimentId: number;

	constructor(public router: Router, private fb: FormBuilder, private dataService: DataService, private route: ActivatedRoute) {	}

	ngOnInit() {
		this.route.params.subscribe({
			next: (params: Params) => {
				console.log("gboDebug:[params]", params);

				this.freezerId = params.freezerId;
				if(this.isEdit) {
					this.alimentId = params.alimentId;
				}
			},
			error: (error: Error) => {
				console.log('Error getting url params.');
			}
		});
		this.alimentForm = this.fb.group({
			name: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			icon: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			category: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			storedDate: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			expirationDate: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			quantityValue: this.fb.control('', [Validators.required, Validators.maxLength(250), this.validateNumber]),
			quantityUnit: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			id: this.fb.control('', [this.isEdit ? Validators.required : Validators.nullValidator, Validators.maxLength(250), this.validateNumber])
		});

		if (this.isEdit) {
			this.dataService.getFreezerContent(this.freezerId).subscribe({
				next: (freezerContent: Aliment[]) => {
					console.log("gboDebug:[this.alimentId]", this.alimentId);
					let alimToEdit = freezerContent.find((alim) => alim.id == this.alimentId);
					if (alimToEdit) {
						this.alimentForm.setValue({
							name: alimToEdit.name,
							icon: alimToEdit.iconicFontName,
							category: alimToEdit.category,
							storedDate: alimToEdit.storedDate,
							expirationDate: alimToEdit.expirationDate,
							quantityValue: alimToEdit.quantity,
							quantityUnit: alimToEdit.quantityUnit,
							id: alimToEdit.id
						});
					}
					else {
						console.log('Could not find the aliment to edit.');
						this.router.navigate(['freezers', this.freezerId]);
					}
				},
				error: (error) => {
					console.log('Could not find the freezer content error:', error);
					this.router.navigate(['freezers', this.freezerId]);
				}
			});
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

	setCurrentFormControl(value: string) {
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
			let alimFromForm: Aliment = new Aliment({
				name: formVal.name
				, category: formVal.category
				, iconicFontName: formVal.icon
				, quantity: formVal.quantityValue
				, quantityUnit: formVal.quantityUnit
				, storedDate: formVal.storedDate
				, expirationDate: formVal.expirationDate
			});

			let dmlObserver: PartialObserver<Aliment> = {
				next: () => {
					this.router.navigate(['freezers', this.freezerId]);
				},
				error: (error) => {
					console.log('error with dml operation insert or update on an aliment:', error);
					this.router.navigate(['freezers', this.freezerId]);
				}
			};

			if (this.isEdit) {
				alimFromForm.id = formVal.id;
				this.dataService.editAliment(this.freezerId, alimFromForm).subscribe(dmlObserver);
			}
			else {
				this.dataService.addAliment(this.freezerId, alimFromForm).subscribe(dmlObserver);
			}
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

	cancelForm(): void {
		this.router.navigate(['freezers', this.freezerId]);
	}

}
