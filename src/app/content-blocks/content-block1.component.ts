import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';
import { IPageEvent, EventTypes } from '../common/models/page-event';

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
	eventCounter: number;

	constructor(injector: Injector) {
		super(injector);
		this.message = injector.get('message');
		this.backgroundColour = injector.get('background-color');
		this.oldBackgroundColor = '#82CAE9';
		this.eventCounter = 0;
	}

	toggleBackgroundColour(event) {
		const currentBackgroundColour = this.backgroundColour;
		this.backgroundColour = this.oldBackgroundColor;
		this.oldBackgroundColor = currentBackgroundColour;

		const targets = this.eventRecipients ? this.eventRecipients : [''];
		this.emitEvent.next({
				name: 'background colour changed',
				componentRaisedBy: this.id,
				componentTargets: targets,
				eventType: EventTypes.GridDeleteClicked,
				data: { value: this.backgroundColour }
			});

		return false;
	}

	handleEvent(event: IPageEvent) {
		if (event.componentTargets && event.componentTargets.find((target) => target === this.id)) {
			this.eventCounter++;
			console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
			console.log(event);
		}
	}
}
