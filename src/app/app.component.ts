import { Component, OnInit } from '@angular/core';
import { DynamicUiService } from './common/services/dynamic-ui.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	componentData = null;
	title = 'app';

	constructor(private dynamicUiService: DynamicUiService) {

	}

	ngOnInit(): void {

	}

	createContentBlock1Component() {
		this.componentData = this.dynamicUiService.getPageLayout('PageOne');
	}

	createContentBlock2Component() {
		this.componentData = this.dynamicUiService.getPageLayout('PageTwo');
	}
}
