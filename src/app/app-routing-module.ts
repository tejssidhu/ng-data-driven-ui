import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentBlock1Component, ContentBlock2Component } from './content-blocks/index';
import { PageComponent } from './pages/page.component';
import { PageResolver } from './pages/page-resolver.service';

const routes: Routes = [
	{ path: 'block1', component: ContentBlock1Component },
	{ path: 'block2', component: ContentBlock2Component },
	{ path: 'page/:id', component: PageComponent, resolve: { pageLayout: PageResolver } }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
