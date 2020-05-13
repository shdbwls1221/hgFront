import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchPanel } from './model/search-panel.model';
// import {NgbModal, ModalDismissReasons, NgbDate, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
//import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material';
//import { PopupComponent } from '../common/popup/popup.component';
import { FormField } from '../edit-dialog/model/form-field.model';
import { ListDialogComponent } from '../list-dialog/list-dialog.component';


@Component({
  selector: 'common-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  _searches: SearchPanel[];
  _title: string;

  constructor(public searchDialog: MatDialog) { 
  } 

  @Input()
  set searches(searches: SearchPanel[]) {
    this._searches = searches;
  }
  get searches() {
    return this._searches;
  }

  @Input()
  set title(title: string) {
    this._title = title;
  }
  get title() {
    return this._title;
  }

  @Output() event = new EventEmitter<SearchPanel[]>();

  searchEvent() {   
    this.event.emit(); 
  }

  openSearchDialog(search: SearchPanel) {
    let dialogRef = this.searchDialog.open(ListDialogComponent, {
      data: search.searchModel
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
				search.valueObj = data;
				search.value = this.getElement(search.searchKey, data);
      }
    });
  }

  getElement(key: string, element: any) {
    let value: any = element;
	
    let keys = key.split('.');
    keys.forEach(key => {
      if (value)
        value = value[key];
    });
    return value;
  }
}
