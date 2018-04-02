import { Component, Injector } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'app-content-block-1',
	templateUrl: 'content-block1.component.html'
})
export class ContentBlock1Component {
	message = '';
	backgroundColour = '';

	constructor(injector: Injector) {
		this.message = injector.get('message');
		this.backgroundColour = injector.get('background-color');
	}

	changeBackgroundColour(event) {
		this.backgroundColour = 'blue';
		return false;
	}
}
