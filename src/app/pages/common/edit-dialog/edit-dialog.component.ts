import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Team } from '../../team/model/team.model';
import { FormField } from './model/form-field.model';
import { Column } from '../list-table/model/column.model';
import { ListDialogComponent } from '../list-dialog/list-dialog.component';
import { T } from '@angular/cdk/keycodes';
import { element } from '@angular/core/src/render3';
import { KeyValue } from '@angular/common';
import { User } from '../../user/model/user.model';
//import { User } from '../../users/user.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent<T> implements OnInit {

  form: FormGroup;
  formFields: FormField[];
  element: any;
  elementId: any;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: T,
    public fb: FormBuilder, public searchDialog: MatDialog) {
		
    this.element = data['element'];
    this.formFields = data['formFields'];
    this.elementId = data['elementId'];

    this.form = this.fb.group(this.element);
  }

  ngOnInit() {
		this.form.setValue(this.element);
  }

  submit(data) {
		this.formFields.forEach(field => {
			if (field.type == 'search') {
				if (!this.element[field.key][field.id] || this.element[field.key][field.id] == 0) 
					data[field.key] = null;
				else
		    	data[field.key] = this.element[field.key];
			}
    });

		this.dialogRef.close(data);
  }

  close(): void {
    this.dialogRef.close();
  }

  openSearchDialog(field: FormField) {
    let dialogRef = this.searchDialog.open(ListDialogComponent, {
      data: field.searchModel
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.element[field.key] = data;
      }
    });
  }
}
