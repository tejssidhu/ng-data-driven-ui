export interface IPageLayout {
	name: string;
	contentBlocks: IContentBlock[];
}

export interface IContentBlock {
	name: string;
	inputs?: IKeyValue[];
}

export interface IKeyValue {
	key: string;
	value: string;
}
