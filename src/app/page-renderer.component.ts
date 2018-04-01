import { Component, ViewContainerRef, ViewChild,
	ReflectiveInjector, ComponentFactoryResolver, Input } from '@angular/core';
import { ContentBlock1Component } from './content-blocks/content-block1.component';
import { ContentBlock2Component } from './content-blocks/content-block2.component';
import { IPageLayout, IContentBlock } from './common';

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

	constructor(private resolver: ComponentFactoryResolver) {

	}

  	// components: a string value of the component you want to create
 	// inputs: An object with key/value pairs mapped to input name/input value
	@Input() set componentData(pageDef: IPageLayout ) {
		if (!pageDef) {
			return;
		}

		for (let index = 0; index < pageDef.contentBlocks.length; index++) {
			const contentBlock: IContentBlock = pageDef.contentBlocks[index];

			// Inputs need to be in the following format to be resolved properly
			const inputProviders = contentBlock.inputs.map((pair) => ({ provide: pair.key, useValue: pair.value }));
			const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

			// We create an injector out of the data we want to pass down to this components injector
			const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.pageContentContainer.parentInjector);

			const componentType = this.componentRegistry[contentBlock.name];

			// We create a factory out of the component we want to create
			const factory = this.resolver.resolveComponentFactory(componentType);

			// We create the component using the factory and the injector
			const component = factory.create(injector);

			// We insert the component into the dom container
			this.pageContentContainer.insert(component.hostView);
		}
	}
}
