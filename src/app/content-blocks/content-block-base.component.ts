import { Component, EventEmitter, Output, Input, Injector } from '@angular/core';
import { IPageEvent } from '../common/models/page-event';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id
})
export class ContentBlockBaseComponent {
	@Output()
	emitEvent = new EventEmitter<IPageEvent>();
	@Input()
	raisedEvents: IPageEvent[];
	id: string;
	colXs: number;
	colSm: number;
	colMd: number;
	colLg: number;
	colClass: string;

	constructor(injector: Injector) {
		this.id = injector.get('id');
		this.colXs = injector.get('xs');
		this.colSm = injector.get('sm');
		this.colMd = injector.get('md');
		this.colLg = injector.get('lg');
		this.colClass = 'col-xs-' + this.colXs + ' col-sm-' + this.colSm + ' col-md-' + this.colMd + ' col-lg-' + this.colLg;
	}
}
