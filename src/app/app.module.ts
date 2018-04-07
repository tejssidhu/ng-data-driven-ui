import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';

import { DynamicUiService } from './common/services/dynamic-ui.service';
import {
	ContentBlock1Component,
	ContentBlock2Component,
	DataGridContentBlockComponent,
	FormContentBlockComponent,
	NotificationContentBlockComponent
} from './content-blocks/index';
import PageRendererComponent from './page-renderer.component';
import { PageResolver, PageComponent } from './pages/index';
import { ODataService } from './services/o-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		ContentBlock1Component,
		ContentBlock2Component,
		NotificationContentBlockComponent,
		FormContentBlockComponent,
		DataGridContentBlockComponent,
		PageRendererComponent,
		PageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		DynamicUiService,
		PageResolver,
		ODataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
