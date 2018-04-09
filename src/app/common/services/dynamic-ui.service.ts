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
				sm: 4,
				md: 4,
				lg: 2,
				rowHeight: 'double'
			},
			{
				id: 'cb1-2',
				xs: 12,
				sm: 4,
				md: 8,
				lg: 5,
				rowHeight: 'single'
			},
			{
				id: 'cb1-3',
				xs: 12,
				sm: 4,
				md: 8,
				lg: 5,
				rowHeight: 'single'
			},
			{
				id: 'cb2-1',
				xs: 12,
				sm: 12,
				md: 12,
				lg: 12,
				rowHeight: 'single'
			},
			{
				id: 'dg-cb-1-1',
				xs: 12,
				sm: 12,
				md: 12,
				lg: 12,
				rowHeight: 'quadruple'
			},
			{
				id: 'c-cb-1-1',
				xs: 0,
				sm: 0,
				md: 0,
				lg: 0,
				rowHeight: 'single'
			},
			{
				id: 'n-cb-1-1',
				xs: 0,
				sm: 0,
				md: 0,
				lg: 0,
				rowHeight: 'single'
			}
		],
		contentBlocks: [
			{
				name: 'ContentBlock1Component',
				id: 'cb1-1',
				inputs: [
					{ key: 'message', value: 'Content Block 1 - 1st' },
					{ key: 'background-color', value: '#F16C66' }
				],
				eventRecipients: ['cb1-2']
			},
			{
				name: 'ContentBlock1Component',
				id: 'cb1-2',
				inputs: [
					{ key: 'message', value: 'Content Block 1 - 2nd' },
					{ key: 'background-color', value: '#27AD7D' }
				],
				eventRecipients: ['cb1-3']
			},
			{
				name: 'ContentBlock1Component',
				id: 'cb1-3',
				inputs: [
					{ key: 'message', value: 'Content Block 1 - 3rd' },
					{ key: 'background-color', value: '#27AD7D' }
				],
				eventRecipients: ['cb1-1', 'cb1-2']
			},
			{
				name: 'ContentBlock2Component',
				id: 'cb2-1',
				inputs: [
					{ key: 'message', value: 'This is a content block 2 component' },
					{ key: 'background-color', value: '#FEF59F' }
				]
			},
			{
				name: 'DataGridContentBlockComponent',
				id: 'dg-cb-1-1',
				inputs: [
					{ key: 'title', value: 'My Items' },
					{ key: 'dataUrl', value: 'http://www.dataservice.com/' },
					{ key: 'objectName', value: 'Items' },
					{ key: 'columns', value: [
						{title: 'Title', columnName: 'title'},
						{title: 'Forename', columnName: 'forename'},
						{title: 'Surname', columnName: 'surname'},
						{title: 'Job', columnName: 'job'}
					]}
				],
				eventRecipients: ['cb1-1', 'c-cb-1-1', 'n-cb-1-1']
			},
			{
				name: 'ConfirmationContentBlockComponent',
				id: 'c-cb-1-1',
				inputs: [],
				eventRecipients: ['dg-cb-1-1']
			},
			{
				name: 'NotificationContentBlockComponent',
				id: 'n-cb-1-1',
				inputs: []
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
				lg: 12,
				rowHeight: 'single'
			}
		],
		contentBlocks: [
			{
				name: 'ContentBlock2Component',
				id: 'cb2-1',
				inputs: [
					{ key: 'message', value: 'This is a content block 2 component' },
					{ key: 'background-color', value: '#FEF59F' }
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
				lg: 3,
				rowHeight: 'triple'
			},
			{
				id: 'cb2-1',
				xs: 12,
				sm: 8,
				md: 4,
				lg: 3,
				rowHeight: 'single'
			}
		],
		contentBlocks: [
			{
				name: 'ContentBlock1Component',
				id: 'cb1-1',
				inputs: [
					{ key: 'message', value: 'This is the 1st content block of the content block 1 component on page 3' },
					{ key: 'background-color', value: '#F16C66' }
				]
			},
			{
				name: 'ContentBlock2Component',
				id: 'cb2-1',
				inputs: [
					{ key: 'message', value: 'This is the 1st content block of the content block 2 component on page 3' },
					{ key: 'background-color', value: '#FEF59F' }
				]
			}
		]
	}
];
