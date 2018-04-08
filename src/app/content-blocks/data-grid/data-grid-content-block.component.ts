import { Component, Injector, OnInit } from '@angular/core';
import { ContentBlockBaseComponent } from '../content-block-base.component';
import { IPageEvent } from '../../common/models/page-event';
import { ODataService } from '../../services/o-data.service';
import { EventTypes } from '../../common/models/event-types';
import { DataGridHeaderColComponent } from './data-grid-header-col.component';
import { DataGridColComponent } from './data-grid-col.component';

@Component({
	moduleId: module.id,
	selector: 'app-data-grid-content-block',
	templateUrl: 'data-grid-content-block.component.html'
})
export class DataGridContentBlockComponent extends ContentBlockBaseComponent implements OnInit {
	title = '';
	items: any[];
	dataUrl: string;
	objectName: string;
	columns: string[];

	constructor(injector: Injector, private oDataService: ODataService) {
		super(injector);
		this.title = injector.get('title');
		this.dataUrl = injector.get('dataUrl');
		this.objectName = injector.get('objectName');
		this.columns = injector.get('columns');
	}

	ngOnInit(): void {
		if (this.dataUrl && this.objectName) {
			this.oDataService.getItems(this.dataUrl, this.objectName, false).subscribe((items) => {
				this.items = items;
			});
		}
	}

	gridItemDeleteClicked(itemId: string) {
		const targets = this.eventRecipients ? this.eventRecipients : [''];
		this.emitEvent.next({
			name: EventTypes.GridDeleteClicked.toString(),
			componentRaisedBy: this.id,
			componentTargets: targets,
			eventType: EventTypes.GridDeleteClicked,
			data: {
				itemId: itemId,
				title: 'Delete Confirmation',
				message: 'Are you sure you want to delete this?',
				okButtonTitle: 'Ok',
				cancelButtonTitle: 'Cancel'
			}
		});
	}

	gridRowClicked(itemId: string) {
		const targets = this.eventRecipients ? this.eventRecipients : [''];
		this.emitEvent.next({
			name: EventTypes.GridRowClicked.toString(),
			componentRaisedBy: this.id,
			componentTargets: targets,
			eventType: EventTypes.GridRowClicked,
			data: { itemId: itemId }
		});
	}

	gridNewItemClicked() {
		const targets = this.eventRecipients ? this.eventRecipients : [''];
		this.emitEvent.next({
			name: EventTypes.GridNewItemClicked.toString(),
			componentRaisedBy: this.id,
			componentTargets: targets,
			eventType: EventTypes.GridNewItemClicked,
			data: {  }
		});
	}

	getValue(item: any, colName: string) {
		return item[colName];
	}

	handleEvent(event: IPageEvent) {
		if (event.componentTargets && event.componentTargets.find((target) => target === this.id)) {
			switch (event.eventType) {
				case EventTypes.ItemSaved:
					this.items[event.data.itemId] = event.data;
					console.log('item saved event');
					console.log('Event was for me ' + this.id + ' :-) - I must do something with this data');
					console.log(event.data);
					break;
				case EventTypes.ConfirmationOkClicked:
					// TODO: delete it
					console.log('item deleted');
					const item: any = this.items.find((_item) => _item.id === event.data.itemId);
					const itemIndex: number = this.items.indexOf(item);
					if (itemIndex >= 0) {
						this.items.splice(itemIndex, 1);
					}
					break;
			}
		}
	}
}
