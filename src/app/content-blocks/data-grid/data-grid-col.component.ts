import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	// tslint:disable-next-line:component-selector
	selector: '[data-grid-col]',
	templateUrl: 'data-grid-col.component.html'
})

export class DataGridColComponent {
	@Input() itemData: string;

	constructor() {

	}
}
