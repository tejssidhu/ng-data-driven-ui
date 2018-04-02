import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';

@Component({
	moduleId: module.id,
	selector: 'app-content-block-1',
	styles: [
		'div { color: white; }'
	],
	templateUrl: 'content-block1.component.html'
})
export class ContentBlock1Component extends ContentBlockBaseComponent {
	message = '';
	backgroundColour = '';
	oldBackgroundColor = '';

	constructor(injector: Injector) {
		super(injector);
		this.message = injector.get('message');
		this.backgroundColour = injector.get('background-color');
		this.oldBackgroundColor = 'blue';

		// how to listen and respond to when the raisedEvents changes
	}

	toggleBackgroundColour(event) {
		const currentBackgroundColour = this.backgroundColour;
		this.backgroundColour = this.oldBackgroundColor;
		this.oldBackgroundColor = currentBackgroundColour;

		this.emitEvent.next({
				name: 'background colour changed',
				componentRaisedBy: 'ContetBlock1Component',
				componentTarget: 'ContentBlock2Component',
				data: { value: this.backgroundColour }
			});

		return false;
	}
}
