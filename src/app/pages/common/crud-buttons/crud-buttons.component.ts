import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListTableComponent } from '../list-table/list-table.component';
import { DefaultListComponent } from '../default/default-list.component';

@Component({
  selector: 'common-crud-buttons',
  templateUrl: './crud-buttons.component.html'
})
export class CrudButtonsComponent<T> {

  _listTableComponent: ListTableComponent<T>;
  _listComponent: DefaultListComponent<T>;

  @Input()
  set listTableComponent(comp: ListTableComponent<T>) {
    this._listTableComponent = comp;
  }

  @Input()
  set listComponent(comp: DefaultListComponent<T>) {
    this._listComponent = comp;
  }

  @Output() searchEvent = new EventEmitter();
  search() {
    this.searchEvent.emit();
  }

  @Output() refreshEvent = new EventEmitter();
  refresh() {
    this.refreshEvent.emit();
  }

  @Output() addEvent = new EventEmitter();
  add() {
    this.addEvent.emit();
  }

  @Output() editEvent = new EventEmitter();
  edit() {
    this.editEvent.emit();
  }

  @Output() deleteEvent = new EventEmitter();
  delete() {
    this.deleteEvent.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }

  
}