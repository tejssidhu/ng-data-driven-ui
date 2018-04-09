import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DynamicUiService } from './common/services/dynamic-ui.service';
import { IPageLayout } from './common';
import { ToastsManager } from 'ng2-toastr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public viewContainerRef: ViewContainerRef;
	title = 'app';
	pageLayouts: IPageLayout[];

	constructor(private dynamicUiService: DynamicUiService, public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;

		this.toastr.setRootViewContainerRef(viewContainerRef);
	}

	ngOnInit(): void {
		this.dynamicUiService.getPageLayouts().subscribe((pageLayouts) => this.pageLayouts = pageLayouts);
	}
}
