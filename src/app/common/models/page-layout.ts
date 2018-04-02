export interface IPageLayout {
	name: string;
	title: string;
	contentBlocks: IContentBlock[];
}

export interface IContentBlock {
	name: string;
	id: string;
	inputs?: IKeyValue[];
}

export interface IKeyValue {
	key: string;
	value: string;
}
