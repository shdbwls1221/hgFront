import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ContentChild, Inject } from '@angular/core';
// import {NgbModal, ModalDismissReasons, NgbDate, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
//import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { PopupComponent } from '../common/popup/popup.component';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { DefaultListComponent } from '../default/default-list.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'common-list-dialog',
  templateUrl: './list-dialog.component.html'
})
export class ListDialogComponent {
  
  title = '팀 선택';
 // model = 'Team';
  row = null;

  ngOnInit(){
  }

  setSelection(data: any) {
    this.row = data;
  }

  constructor(public dialogRef: MatDialogRef<ListDialogComponent>, @Inject(MAT_DIALOG_DATA) public searchModel: string) {
  }

  select(): void {
    this.dialogRef.close(this.row);
  }

  close(): void {
    this.dialogRef.close();
  }
}
