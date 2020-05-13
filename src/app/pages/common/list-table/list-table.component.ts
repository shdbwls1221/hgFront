import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, PageEvent, MatSort, Sort } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { SelectionModel } from '@angular/cdk/collections';
import { last } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material';
import { SearchPanel } from '../search/model/search-panel.model';
import { Page } from './model/page.model';
import { Condition } from 'selenium-webdriver';
import { SearchOperation } from '../search/model/search-operation.model';
import { optionalGetterForProp } from '@swimlane/ngx-datatable/release/utils';
import { map } from 'rxjs/operators';
import { Column } from './model/column.model';
import { SearchComponent } from '../search/search.component';
import { DefaultListComponent } from '../default/default-list.component';


@Component({
  selector: 'common-list-table',
  templateUrl: './list-table.component.html'
})
export class ListTableComponent<T> {

  _columns: Column[];
  displayedColumns: string[] = ['select'];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  page: Page = new Page(0, 5, "asc", "defaultKey");
  list: T[] = [];
  settings: Settings;
  selection = new SelectionModel<T>(true, []);
  length: number = 0;
  listComponent: DefaultListComponent<T>;
  
  @Output() event = new EventEmitter();

  @Output() selectEvent = new EventEmitter();
  onSelect() {
    this.selectEvent.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  set columns(columns: Column[]) {
    this._columns = columns;
    this._columns.forEach(column => this.displayedColumns.push(column.columnDef));
  }

  get columns() {
    return this._columns;
  }

  // 정렬
  sortData(sort: Sort) {
    this.page.dir = sort.direction;
    this.page.key = sort.active;
    this.event.emit();
  }

  // 페이징
  paginate(pageEvent: PageEvent) {
    this.page.pageIndex = pageEvent.pageIndex;
    this.page.pageSize = pageEvent.pageSize;
    this.event.emit();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.list.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list.forEach(row => this.selection.select(row));
  }

	
	getLetter(column: Column, element: T) {
		
		if (!column.letter) return this.getElement(column['key'], element);
		
		let letter = '';
		let params = [{key: 'userCount'}, '명'];
		params.forEach(param => {
			if (param['key'])
				letter += this.getElement(param['key'], element);
			else letter += param;
		});
		return  letter;
	}

  getElement(key: string, element: T) {

    let value: any = element;

    let keys = key.split('.');
    keys.forEach(key => {
      if (value)
        value = value[key];
    });
    return value;
  }
}