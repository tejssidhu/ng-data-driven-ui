export interface IPageEvent {
	name: string;
	componentRaisedBy: string;
	componentTargets: string[];
	data: any;
}
