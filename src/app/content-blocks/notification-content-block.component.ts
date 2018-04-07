import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';
import { IPageEvent } from '../common/models/page-event';
import { EventTypes } from '../common/models/event-types';

@Component({
	moduleId: module.id,
	selector: 'app-notification-content-block',
	templateUrl: 'notification-content-block.component.html'
})
export class NotificationContentBlockComponent extends ContentBlockBaseComponent {
	title = '';
	events: string[] = [];

	constructor(injector: Injector) {
		super(injector);
		this.title = injector.get('title');
	}

	handleEvent(event: IPageEvent) {
		if (event.componentTargets && event.componentTargets.find((target) => target === this.id)) {
			switch (event.eventType) {
				case EventTypes.GridNewItemClicked:
					console.log('grid new item was clicked');
					break;
				case EventTypes.GridRowClicked:
					console.log('grid row was clicked');
					break;
				case EventTypes.GridDeleteClicked:
					console.log('grid delete item clicked');
					break;
				case EventTypes.ItemSaved:
					console.log('item saved');
					break;
			}

			console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
			console.log(event.data);
		}
	}
}
