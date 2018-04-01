import { Component, Injector } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'app-content-block-2',
	templateUrl: 'content-block2.component.html'
})
export class ContentBlock2Component {
	message = '';

	constructor(injector: Injector) {
		this.message = injector.get('message');
	}
}
