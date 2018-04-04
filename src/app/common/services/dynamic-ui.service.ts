import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { IPageLayout, IContentBlock } from '../models/page-layout';

@Injectable()
export class DynamicUiService {

	getPageLayouts(): Observable<IPageLayout[]> {
		const subject = new Subject<IPageLayout[]>();
		setTimeout(() => {subject.next(PAGELAYOUTS); subject.complete(); }, 100);
		return subject;
	}

	getPageLayout(name: string): IPageLayout {
		return PAGELAYOUTS.find(pageLayout => pageLayout.name === name);
	}
}

const PAGELAYOUTS: IPageLayout[] = [
	{
		name: 'PageOne',
		title: 'Page One',
		layouts: [
			{
				id: 'cb1-1',
				xs: 12,
				sm: 6,
				md: 4,
				lg: 3
			},
			{
				id: 'cb1-2',
				xs: 12,
				sm: 6,
				md: 4,
				lg: 3
			}
		],
		contentBlocks: [
			{
				name: 'ContentBlock1Component',
				id: 'cb1-1',
				inputs: [
					{ key: 'message', value: 'This is the 1st content block of the content block 1 component' },
					{ key: 'background-color', value: 'red' }
				]
			},
			{
				name: 'ContentBlock1Component',
				id: 'cb1-2',
				inputs: [
					{ key: 'message', value: 'This is the 2nd content block of the content block 1 component' },
					{ key: 'background-color', value: 'green' }
				]
			}
		]
	},
	{
		name: 'PageTwo',
		title: 'Page Two',
		layouts: [
			{
				id: 'cb2-1',
				xs: 12,
				sm: 12,
				md: 12,
				lg: 12
			}
		],
		contentBlocks: [
			{
				name: 'ContentBlock2Component',
				id: 'cb2-1',
				inputs: [
					{ key: 'message', value: 'This is a content block 2 component' }
				]
			}
		]
	},
	{
		name: 'PageThree',
		title: 'Page Three',
		layouts: [
			{
				id: 'cb1-1',
				xs: 12,
				sm: 8,
				md: 4,
				lg: 3
			},
			{
				id: 'cb2-1',
				xs: 12,
				sm: 8,
				md: 4,
				lg: 3
			}
		],
		contentBlocks: [
			{
				name: 'ContentBlock1Component',
				id: 'cb1-1',
				inputs: [
					{ key: 'message', value: 'This is the 1st content block of the content block 1 component on page 3' },
					{ key: 'background-color', value: 'red' }
				]
			},
			{
				name: 'ContentBlock2Component',
				id: 'cb2-1',
				inputs: [
					{ key: 'message', value: 'This is the 1st content block of the content block 2 component on page 3' }
				]
			}
		]
	}
];
