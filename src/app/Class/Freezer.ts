import { Aliment } from "./Aliment";

export class Freezer {
	id: number;
	name: string;
	content: Aliment[];

	constructor(inputWrapper: {name?: string; id?: number; content?: Aliment[]}) {
		this.id = inputWrapper.id;
		this.name = inputWrapper.name;
		this.content = inputWrapper.content;
	}
}
