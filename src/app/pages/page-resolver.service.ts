import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DynamicUiService } from '../common/services/dynamic-ui.service';

@Injectable()
export class PageResolver implements Resolve<any> {
	constructor(private dynamicUiService: DynamicUiService) {

	}

	resolve(route: ActivatedRouteSnapshot) {
		return this.dynamicUiService.getPageLayout(route.params['id']);
	}
}
