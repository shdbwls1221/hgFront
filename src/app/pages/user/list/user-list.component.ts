import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { SearchOperation } from '../../common/search/model/search-operation.model';
import { Column } from '../../common/list-table/model/column.model';
import { DefaultListComponent } from '../../common/default/default-list.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormField } from '../../common/edit-dialog/model/form-field.model';
import { Team } from '../../team/model/team.model';

@Component({
	selector: 'user-list',
	templateUrl: '../../common/default/default-list.component.html'
})
export class UserListComponent extends DefaultListComponent<User> {

	constructFormModel(): User {
		let user = new User();
		user.name = '';
		user.addr = '';
		user.email = '';
		user.team = new Team(); 
		
		return user;
  }

  getId(): string {
    return 'id';
  }

	getTitle(): string {
		return '유저 목록 조회';
	}

	getFormFields(): FormField[] {
		return [
			{
				label: '이름',
				key: 'name',
				type: 'text'
			},
			{
				label: '이메일',
				key: 'email',
				type: 'text'
			},
			{
				label: '주소',
				key: 'addr',
				type: 'text'
			},
			{
				label: '팀',
				key: 'team',
				type: 'search',
				letter: 'name',
        searchModel: 'Team',
        id: 'id'
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
				columnName: '이름'
			},
			{
				columnDef: 'email',
				key: 'email',
				columnName: '이메일'
			},
			{
				columnDef: 'addr',
				key: 'addr',
				columnName: '주소'
			},
			{
				columnDef: 'team',
				key: 'team.name',
				columnName: '소속팀'
			}
		];
	}

	getSearches(): SearchPanel[] {
		let searches: SearchPanel[] = [
			{
				type: "text",
				label: "이름",
				value: "",
				key: 'name',
				condition: SearchOperation.Like
			},
			{
				type: "search",
				label: "소속팀",
				value: "",
				key: 'team',
				condition: SearchOperation.Like,
				searchModel: 'Team',
				letter: 'name',
				searchKey: 'id',
				valueObj: ''
			}
		];

		return searches;
	}

	constructor(public userService: UserService, public dialog: MatDialog, public snackBar: MatSnackBar) {
		super(userService, dialog, snackBar);
	}
}