import { Component, OnInit } from '@angular/core';
import { DynamicUiService } from './common/services/dynamic-ui.service';
import { IPageLayout } from './common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	pageLayouts: IPageLayout[];

	constructor(private dynamicUiService: DynamicUiService) {

	}

	ngOnInit(): void {
		this.dynamicUiService.getPageLayouts().subscribe((pageLayouts) => this.pageLayouts = pageLayouts);
	}
}
