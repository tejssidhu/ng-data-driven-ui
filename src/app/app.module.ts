import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';

import { DynamicUiService } from './common/services/dynamic-ui.service';
import { ContentBlock1Component, ContentBlock2Component } from './content-blocks/index';
import PageRendererComponent from './page-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentBlock1Component,
    ContentBlock2Component,
    PageRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DynamicUiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
