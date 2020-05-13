import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team.service';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { SearchOperation } from '../../common/search/model/search-operation.model';
import { Column } from '../../common/list-table/model/column.model';
import { DefaultListComponent } from '../../common/default/default-list.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditDialogComponent } from '../../common/edit-dialog/edit-dialog.component';
import { ListTableComponent } from '../../common/list-table/list-table.component';
import { FormField } from '../../common/edit-dialog/model/form-field.model';

@Component({
  selector: 'team-list',
  templateUrl: '../../common/default/default-list.component.html'
})
export class TeamListComponent extends DefaultListComponent<Team> {
	constructFormModel(): Team {
		let team = new Team();	
		team.name = '';
		return team;
  }
  
  getId(): string {
    return 'id';
  }

  getTitle(): string {
    return '팀 목록 조회';
  }

  getFormFields(): FormField[] {
    return [
      {
        label: '팀명',
        key: 'name',
        type: 'text'
      }
    ];
  }

  getColumns(): Column[] {
    return [
      {
        columnDef: 'id',
        key: 'id',
        columnName: '번호',
        columnSize: '70px'
      },
      {
        columnDef: 'name',
        key: 'name',
        columnName: '팀명'
      },
      {
        columnDef: 'userCount',
        key: 'userCount',
        columnName: '팀원수',
				letter: [{key: 'userCount'}, '명']
      }
    ];
  }

  getSearches(): SearchPanel[] {
    let searches: SearchPanel[] = [
      {
        type: "text",
        label: "팀명",
        value: "",
        key: 'name',
        condition: SearchOperation.Like
      },
      {
        type: "text",
        label: "소속 팀원 이름",
        value: "",
        key: 'id',
        condition: SearchOperation.Like
      },
      {
        type: 'select',
        label: '셀렉트 테스트',
        value: '',
        key: 'name',
        condition: SearchOperation.Like,
      }
    ];

    let options: Map<String, Object> = new Map();
    options.set("aaa", "AAA");
    options.set("bbb", "BBB");
    options.set("ccc", "BBB");
    searches[2].options = options;

    return searches;
  }

  constructor(private teamService: TeamService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    super(teamService, dialog, snackBar);
  }
}