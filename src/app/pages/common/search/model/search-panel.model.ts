import { SearchOperation } from "./search-operation.model";

 export class SearchPanel {
    label: string;
    type: string;
    key: string;
    value: string;
    condition?: SearchOperation;

    options?: Map<String, Object>;
		searchModel?: string;
		letter?: string;
		searchKey?: string;
		valueObj?: any;
}