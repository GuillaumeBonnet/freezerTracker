export class Aliment {
  id: Number;
  name: String;
  category: String;
  iconicFontName: String;
  quantity: Number;
  quantityUnit: String;
  storedDate: Date;
  expirationDate: Date;

  constructor( name?, category?, iconicFontName?, quantity?, quantityUnit?, storedDate?, expirationDate?) {
    this.name = name;
    this.category = category;
    this.iconicFontName = iconicFontName;
    this.quantity = quantity;
    this.quantityUnit = quantityUnit;
    this.storedDate = storedDate;
    this.expirationDate = expirationDate;
  }
}
