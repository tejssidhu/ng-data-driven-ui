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

	constructor(injector: Injector) {
		this.id = injector.get('id');
	}
}
