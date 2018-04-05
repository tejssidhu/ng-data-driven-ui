import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';
import { IPageEvent } from '../common/models/page-event';

@Component({
	moduleId: module.id,
	selector: 'app-content-block-2',
	templateUrl: 'content-block2.component.html'
})
export class ContentBlock2Component extends ContentBlockBaseComponent {
	message = '';
	backgroundColour = '';
	events: string[] = [];

	constructor(injector: Injector) {
		super(injector);
		this.message = injector.get('message');
		this.backgroundColour = injector.get('background-color');
	}

	handleEvent(event: IPageEvent) {
		if (event.componentTargets && event.componentTargets.find((target) => target === this.id)) {
			this.events.push('Event from ' + event.componentRaisedBy);
			console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
			console.log(event.data);
		}
	}
}
