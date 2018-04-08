import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';
import { IPageEvent } from '../common/models/page-event';
import { EventTypes } from '../common/models/event-types';

@Component({
	moduleId: module.id,
	selector: 'app-form-content-block',
	templateUrl: 'form-content-block.component.html'
})
export class FormContentBlockComponent extends ContentBlockBaseComponent {
	title = '';
	events: string[] = [];

	constructor(injector: Injector) {
		super(injector);
		this.title = injector.get('title');
	}

	itemSaved(itemId: string) {
		if (itemId === '') {
			// new item - save and get itemId
			itemId = 'new-item-id';
		} else {
			// existing item - save it
		}

		const targets = this.eventRecipients ? this.eventRecipients : [''];
		this.emitEvent.next({
			name: EventTypes.ItemSaved.toString(),
			componentRaisedBy: this.id,
			componentTargets: targets,
			eventType: EventTypes.ItemSaved,
			data: { itemId: itemId }
		});
	}

	handleEvent(event: IPageEvent) {
		if (event.componentTargets && event.componentTargets.find((target) => target === this.id)) {
			switch (event.eventType) {
				case EventTypes.GridNewItemClicked:
					console.log('grid new item was clicked');
					console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
					console.log(event.data);
					break;
				case EventTypes.GridRowClicked:
					console.log('grid row was clicked');
					console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
					console.log(event.data);
					break;
			}
		}
	}
}
