import { Component } from '@angular/core';
import { ContentBlock1Component, ContentBlock2Component } from './content-blocks/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentData = null;
  title = 'app';

  createContentBlock1Component() {
    this.componentData = {
      component: ContentBlock1Component,
      inputs: {
        message: 'This is a content block 1 component',
        'background-color': 'red'
      }
    };
  }

  createContentBlock2Component() {
    this.componentData = {
      component: ContentBlock2Component,
      inputs: {
        message: 'This is a content block 2 component'
      }
    };
  }
}
