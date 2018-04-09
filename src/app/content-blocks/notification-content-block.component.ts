import { Component, Injector } from '@angular/core';
import { ContentBlockBaseComponent } from './content-block-base.component';
import { IPageEvent } from '../common/models/page-event';
import { EventTypes } from '../common/models/event-types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	moduleId: module.id,
	selector: 'app-notification-content-block',
	template: ``
})
export class NotificationContentBlockComponent extends ContentBlockBaseComponent {
	events: string[] = [];

	constructor(injector: Injector, private toastr: ToastsManager) {
		super(injector);
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
					this.toastr.success(event.data.message);
					console.log('item saved');
					break;
				case EventTypes.ItemDeleted:
					this.toastr.success(event.data.message);
					console.log('item deleted successfully');
					break;
			}

			console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
			console.log(event.data);
		}
	}
}
