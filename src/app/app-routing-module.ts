import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentBlock1Component, ContentBlock2Component } from './content-blocks/index';

const routes: Routes = [
  { path: 'block1', component: ContentBlock1Component },
  { path: 'block2', component: ContentBlock2Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
