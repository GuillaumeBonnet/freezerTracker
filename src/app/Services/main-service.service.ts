import { Injectable } from '@angular/core'
import { Options } from 'simplebar'

@Injectable()
export class MainServiceService {
	constructor() {}

	simpleBarOptions: Options = {
		autoHide: false,
		clickOnTrack: true,
	}

	pixelToNumber(pixelString: String): number {
		return +pixelString.substr(0, pixelString.length - 2)
	}

	polarToX(radius: number, deg: number): number {
		return radius * Math.cos((deg * Math.PI) / 180)
	}

	polarToY(radius: number, deg: number): number {
		return radius * Math.sin((deg * Math.PI) / 180)
	}
}
