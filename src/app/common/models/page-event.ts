import * as Enums from './event-types';

export interface IPageEvent {
	name: string;
	componentRaisedBy: string;
	componentTargets: string[];
	eventType: Enums.EventTypes;
	data: any;
}
