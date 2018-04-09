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
	NotificationContentBlockComponent,
	DataGridHeaderColComponent,
	DataGridColComponent
} from './content-blocks/index';
import PageRendererComponent from './page-renderer.component';
import { PageResolver, PageComponent } from './pages/index';
import { ODataService } from './services/o-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationContentBlockComponent } from './content-blocks/confirmation-content-block.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		ContentBlock1Component,
		ContentBlock2Component,
		NotificationContentBlockComponent,
		FormContentBlockComponent,
		DataGridContentBlockComponent,
		DataGridHeaderColComponent,
		DataGridColComponent,
		PageRendererComponent,
		PageComponent,
		ConfirmationContentBlockComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ModalModule.forRoot(),
		BrowserAnimationsModule,
		ToastModule.forRoot()
	],
	providers: [
		DynamicUiService,
		PageResolver,
		ODataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
