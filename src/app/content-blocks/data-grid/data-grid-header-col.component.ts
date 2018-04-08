import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	// tslint:disable-next-line:component-selector
	selector: '[data-grid-header-col]',
	templateUrl: 'data-grid-header-col.component.html'
})

export class DataGridHeaderColComponent {
	@Input() headerName: string;

	constructor() {

	}
}
