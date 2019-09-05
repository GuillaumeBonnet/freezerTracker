import { Injectable } from '@angular/core';

@Injectable()
export class MainServiceService {

	constructor() { }

	pixelToNumber(pixelString: String): number {
		return +pixelString.substr(0, pixelString.length - 2);
	}

	polarToX(radius: number, deg: number): number {
		return radius * Math.cos(deg * Math.PI / 180);
	}

	polarToY(radius: number, deg: number): number {
		return radius * Math.sin(deg * Math.PI / 180);
	}

}
