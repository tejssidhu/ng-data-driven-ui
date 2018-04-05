export interface IPageLayout {
	name: string;
	title: string;
	contentBlocks: IContentBlock[];
	layouts: IContentBlockLayout[];
}

export interface IContentBlock {
	name: string;
	id: string;
	inputs?: IKeyValue[];
	eventRecipients?: string[];
}

export interface IContentBlockLayout {
	id: string;
	xs: number;
	sm: number;
	md: number;
	lg: number;
	rowHeight: string;
}

export interface IKeyValue {
	key: string;
	value: string;
}
