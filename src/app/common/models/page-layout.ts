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
}

export interface IContentBlockLayout {
	id: string;
	xs: number;
	sm: number;
	md: number;
	lg: number;
}

export interface IKeyValue {
	key: string;
	value: string;
}
