import { Component } from '@angular/core';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { SearchOperation } from '../../common/search/model/search-operation.model';
import { Column } from '../../common/list-table/model/column.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormField } from '../../common/edit-dialog/model/form-field.model';
import { DefaultListComponent } from '../../common/default/default-list.component';
import { ConInterface } from '../model/con-interface.model';
import { ConInterfaceService } from '../service/con-interface.service';

@Component({
  selector: 'app-con-interface-list',
  templateUrl: '../../common/default/default-list.component.html'
})
export class ConInterfaceListComponent extends DefaultListComponent<ConInterface> {

  constructFormModel(): ConInterface {
    let conInterface = new ConInterface();
    conInterface.instCode = "";
    conInterface.intfId = "";
    conInterface.intfName = "";
    return conInterface;
  }

  getId(): string {
    return 'intfId';
  }

  getTitle(): string {
    return '연계 인터페이스 목록 조회';
  }

  getFormFields(): FormField[] {
    return [
      {
        label: '기관코드',
        key: 'instCode',
        type: 'text'
      },
      {
        label: '인터페이스ID',
        key: 'intfId',
        type: 'text'
      },
      {
        label: '인터페이스명',
        key: 'intfName',
        type: 'text'
      }
    ];
  }

  getColumns(): Column[] {
    return [
      {
        columnDef: 'instCode',
        key: 'instCode',
        columnName: '기관코드',
        columnSize: '70px'
      },     
      {
        columnDef: 'intfId',
        key: 'intfId',
        columnName: '인터페이스ID'
      },
      {
        columnDef: 'intfName',
        key: 'intfName',
        columnName: '인터페이스명'
      }
    ];
  }

  getSearches(): SearchPanel[] {
    let searches: SearchPanel[] = [
      {
        type: "text",
        label: "기관코드",
        value: "",
        key: 'instCode',
        condition: SearchOperation.Like
      },
      {
        type: "text",
        label: "인터페이스ID",
        value: "",
        key: 'intfId',
        condition: SearchOperation.Like
      },
      {
        type: "text",
        label: "인터페이스명",
        value: "",
        key: 'intfName',
        condition: SearchOperation.Like
      }
    ];

    return searches;
  }

  constructor(private conInterfaceService: ConInterfaceService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    super(conInterfaceService, dialog, snackBar);
  }

}
