import { Component, EventEmitter, Output, Input, Injector } from '@angular/core';
import { IPageEvent } from '../common/models/page-event';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id
})
export class ContentBlockBaseComponent {
	@Output()
	emitEvent = new EventEmitter<IPageEvent>();

	private _raisedEvent: IPageEvent;
	@Input() set raisedEvent(value: IPageEvent) {
		this._raisedEvent = value;
		this.handleEvent(this._raisedEvent);
	}
	get raisedEvents(): IPageEvent {
		return this._raisedEvent;
	}

	id: string;
	colXs: number;
	colSm: number;
	colMd: number;
	colLg: number;
	rowHeight: string;
	componentHeightClass: string;
	componentLayoutClass: string;
	eventRecipients: string[];

	constructor(injector: Injector) {
		this.id = injector.get('id');
		this.colXs = injector.get('xs');
		this.colSm = injector.get('sm');
		this.colMd = injector.get('md');
		this.colLg = injector.get('lg');
		this.rowHeight = injector.get('rowHeight');
		this.componentHeightClass = 'row-' + this.rowHeight;
		this.componentLayoutClass = 'col-xs-' + this.colXs + ' col-sm-' + this.colSm + ' col-md-' + this.colMd + ' col-lg-' + this.colLg + ' row-' + this.rowHeight;

		try {
			this.eventRecipients = JSON.parse(injector.get('eventRecipients'));
		} catch (e) {
			this.eventRecipients = undefined;
			console.log('this component ' + this.id + ' doesnt have any eventRecipients');
		}
	}

	handleEvent(events: IPageEvent) {

	}
}
