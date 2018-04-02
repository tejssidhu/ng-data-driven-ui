import { Component, Injector } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'app-content-block-1',
	styles: [
		'div { color: white; }'
	],
	templateUrl: 'content-block1.component.html'
})
export class ContentBlock1Component {
	message = '';
	backgroundColour = '';
	oldBackgroundColor = '';

	constructor(injector: Injector) {
		this.message = injector.get('message');
		this.backgroundColour = injector.get('background-color');
		this.oldBackgroundColor = 'blue';
	}

	toggleBackgroundColour(event) {
		const currentBackgroundColour = this.backgroundColour;
		this.backgroundColour = this.oldBackgroundColor;
		this.oldBackgroundColor = currentBackgroundColour;

		return false;
	}
}
