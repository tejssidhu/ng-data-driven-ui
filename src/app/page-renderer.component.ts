import { Component, ViewContainerRef, ViewChild,
	ReflectiveInjector, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { ContentBlock1Component } from './content-blocks/content-block1.component';
import { ContentBlock2Component } from './content-blocks/content-block2.component';
import { IPageLayout, IContentBlock, IContentBlockLayout } from './common';
import { IPageEvent } from './common/models/page-event';
import { ContentBlockBaseComponent } from './content-blocks/content-block-base.component';
import { DataGridContentBlockComponent } from './content-blocks/data-grid/data-grid-content-block.component';
import { FormContentBlockComponent } from './content-blocks/form-content-block.component';
import { NotificationContentBlockComponent } from './content-blocks/notification-content-block.component';
import { ConfirmationContentBlockComponent } from './content-blocks';

export interface IRegisteredComponent {
	id: string;
	component: ContentBlockBaseComponent;
}

@Component({
	selector: 'app-page-renderer',
	entryComponents: [ContentBlock1Component,
		ContentBlock2Component,
		NotificationContentBlockComponent,
		FormContentBlockComponent,
		DataGridContentBlockComponent,
		ConfirmationContentBlockComponent
	],
	template: `
		<div #pageContentContainer></div>
  	`,
})
export default class PageRendererComponent {
	@ViewChild('pageContentContainer', { read: ViewContainerRef }) pageContentContainer: ViewContainerRef;
	// registry to convert string values to their corresponding component type
	componentLookup = {
		'ContentBlock1Component': ContentBlock1Component,
		'ContentBlock2Component': ContentBlock2Component,
		'DataGridContentBlockComponent': DataGridContentBlockComponent,
		'FormContentBlockComponent': FormContentBlockComponent,
		'NotificationContentBlockComponent': NotificationContentBlockComponent,
		'ConfirmationContentBlockComponent': ConfirmationContentBlockComponent
	};
	registeredComponents: IRegisteredComponent[] = [];

	constructor(private resolver: ComponentFactoryResolver) {

	}

  	// components: a string value of the component you want to create
 	// inputs: An object with key/value pairs mapped to input name/input value
	@Input() set componentData(pageDef: IPageLayout ) {
		if (!pageDef) {
			return;
		}

		this.pageContentContainer.clear();
		this.registeredComponents = [];

		for (let index = 0; index < pageDef.contentBlocks.length; index++) {
			const contentBlock: IContentBlock = pageDef.contentBlocks[index];

			// Define the inputs to pass to our dynamically created components
			// contentBlock.inputs
			const inputProviders = contentBlock.inputs.map((pair) => ({ provide: pair.key, useValue: pair.value }));
			// contentBlock.layout properties and content block id
			const layoutForContentBlock: IContentBlockLayout = pageDef.layouts.find((layout) => layout.id === contentBlock.id);
			Object.keys(layoutForContentBlock).map((inputName) => ( inputProviders.push({ provide: inputName, useValue: layoutForContentBlock[inputName] })));
			if (contentBlock.eventRecipients) {
				inputProviders.push({ provide: 'eventRecipients', useValue: JSON.stringify(contentBlock.eventRecipients) });
			}

			const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

			// We create an injector out of the data we want to pass down to this components injector
			const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.pageContentContainer.parentInjector);

			const componentType = this.componentLookup[contentBlock.name];

			// We create a factory out of the component we want to create
			const factory = this.resolver.resolveComponentFactory(componentType);

			const component = this.pageContentContainer.createComponent(factory, index, injector).instance;
			const baseComp = (component as ContentBlockBaseComponent);
			component['emitEvent'].subscribe((eventData) => {
				for (let itr = 0; itr < this.registeredComponents.length; itr++) {
					this.registeredComponents[itr].component.raisedEvent = eventData;
				}
			});

			if (!this.registeredComponents.find((comp) => comp.id === contentBlock.id)) {
				this.registeredComponents.push( { id: contentBlock.id, component: baseComp });
			}
		}
	}
}
