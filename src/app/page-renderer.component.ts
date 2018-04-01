import { Component, ViewContainerRef, ViewChild,
	ReflectiveInjector, ComponentFactoryResolver, Input } from '@angular/core';
import { ContentBlock1Component } from './content-blocks/content-block1.component';
import { ContentBlock2Component } from './content-blocks/content-block2.component';

@Component({
	selector: 'app-page-renderer',
	// Reference to the components must be here in order to dynamically create them
	entryComponents: [ContentBlock1Component, ContentBlock2Component],
	template: `
		<div #pageContentContainer></div>
  	`,
})
export default class PageRendererComponent {
	@ViewChild('pageContentContainer', { read: ViewContainerRef }) pageContentContainer: ViewContainerRef;
	componentRegistry = {
		'ContentBlock1Component': ContentBlock1Component,
		'ContentBlock2Component': ContentBlock2Component
	};

	constructor(private resolver: ComponentFactoryResolver) {

	}

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
	@Input() set componentData(data: {component: any, inputs: any }) {
		if (!data) {
			return;
		}

		// Inputs need to be in the following format to be resolved properly
		const inputProviders = Object.keys(data.inputs).map((inputName) => ({ provide: inputName, useValue: data.inputs[inputName] }));
		const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

		// We create an injector out of the data we want to pass down and this components injector
		const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.pageContentContainer.parentInjector);

		// We create a factory out of the component we want to create
		const factory = this.resolver.resolveComponentFactory(this.componentRegistry[data.component]);

		// We create the component using the factory and the injector
		const component = factory.create(injector);

		// We insert the component into the dom container
		this.pageContentContainer.insert(component.hostView);
	}
}
