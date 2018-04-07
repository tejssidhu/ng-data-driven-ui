export enum EventTypes {
	GridRowClicked,
	GridDeleteClicked,
	GridNewItemClicked,
	ItemSaved
}

export interface IPageEvent {
	name: string;
	componentRaisedBy: string;
	componentTargets: string[];
	eventType: EventTypes;
	data: any;
}
