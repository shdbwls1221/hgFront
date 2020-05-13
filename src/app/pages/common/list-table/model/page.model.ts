export class Page {
    pageIndex: number;
    pageSize: number;
    dir: string;
    key: string;

    constructor(pageIndex: number, pageSize:number, dir:string, key:string) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.dir = dir;
        this.key = key;
    }
}


