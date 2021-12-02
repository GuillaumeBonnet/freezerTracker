export class Aliment {
	id: number;
	name: string;
	category: string;
	iconicFontName: string;
	quantity: Number;
	quantityUnit: string;
	storedDate: Date;
	expirationDate: Date;

	constructor(inputWrapper?: {
		id?: number,
		name?: string,
		category?: string,
		iconicFontName?: string,
		quantity?: number,
		quantityUnit?: string,
		storedDate?: Date,
		expirationDate?: Date,
	}) {
		if(inputWrapper) {
			this.id = inputWrapper.id;
			this.name = inputWrapper.name;
			this.category = inputWrapper.category;
			this.iconicFontName = inputWrapper.iconicFontName;
			this.quantity = inputWrapper.quantity;
			this.quantityUnit = inputWrapper.quantityUnit;
			this.storedDate = inputWrapper.storedDate;
			this.expirationDate = inputWrapper.expirationDate;
		}
	}
}
