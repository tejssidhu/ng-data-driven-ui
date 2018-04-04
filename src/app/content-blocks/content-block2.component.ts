import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';

@Component({
	moduleId: module.id,
	selector: 'app-content-block-2',
	templateUrl: 'content-block2.component.html'
})
export class ContentBlock2Component extends ContentBlockBaseComponent {
	message = '';
	backgroundColour = '';

	constructor(injector: Injector) {
		super(injector);
		this.message = injector.get('message');
		this.backgroundColour = injector.get('background-color');

		// TODO: how to listen and respond to when the raisedEvents changes
	}
}
