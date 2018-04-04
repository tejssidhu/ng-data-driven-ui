import { Component, ViewContainerRef, ViewChild,
	ReflectiveInjector, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { ContentBlock1Component } from './content-blocks/content-block1.component';
import { ContentBlock2Component } from './content-blocks/content-block2.component';
import { IPageLayout, IContentBlock, IContentBlockLayout } from './common';
import { IPageEvent } from './common/models/page-event';
import { ContentBlockBaseComponent } from './content-blocks/content-block-base.component';

@Component({
	selector: 'app-page-renderer',
	entryComponents: [ContentBlock1Component, ContentBlock2Component],
	template: `
		<div #pageContentContainer></div>
  	`,
})
export default class PageRendererComponent {
	@ViewChild('pageContentContainer', { read: ViewContainerRef }) pageContentContainer: ViewContainerRef;


	// registry to convert string values to their corresponding component type
	componentRegistry = {
		'ContentBlock1Component': ContentBlock1Component,
		'ContentBlock2Component': ContentBlock2Component
	};
	pageEvents: IPageEvent[];

	constructor(private resolver: ComponentFactoryResolver) {
		this.pageEvents = [];
	}

  	// components: a string value of the component you want to create
 	// inputs: An object with key/value pairs mapped to input name/input value
	@Input() set componentData(pageDef: IPageLayout ) {
		if (!pageDef) {
			return;
		}

		this.pageContentContainer.clear();

		for (let index = 0; index < pageDef.contentBlocks.length; index++) {
			const contentBlock: IContentBlock = pageDef.contentBlocks[index];

			// Define the inputs to pass to our dynamically created components
			// contentBlock.inputs
			const inputProviders = contentBlock.inputs.map((pair) => ({ provide: pair.key, useValue: pair.value }));
			// contentBlock.layout properties and content block id
			const layoutForContentBlock: IContentBlockLayout = pageDef.layouts.find((layout) => layout.id === contentBlock.id);
			Object.keys(layoutForContentBlock).map((inputName) => ( inputProviders.push({ provide: inputName, useValue: layoutForContentBlock[inputName] })));

			const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

			// We create an injector out of the data we want to pass down to this components injector
			const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.pageContentContainer.parentInjector);

			const componentType = this.componentRegistry[contentBlock.name];

			// We create a factory out of the component we want to create
			const factory = this.resolver.resolveComponentFactory(componentType);

			const component = this.pageContentContainer.createComponent(factory, index, injector).instance;
			(component as ContentBlockBaseComponent).raisedEvents = this.pageEvents;
			component['emitEvent'].subscribe((eventData) => {
				this.pageEvents.push(eventData);
				console.log(eventData);
			});

		}
	}
}
