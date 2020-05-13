import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, PageEvent, MatSort, Sort, MatSnackBar, MatDialog } from '@angular/material';
import { SearchPanel } from '../search/model/search-panel.model';
import { Column as ListColumn } from '../list-table/model/column.model';
import { ListTableComponent } from '../list-table/list-table.component';
import { SearchComponent } from '../search/search.component';
import { CrudService } from './default-service.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FormField } from '../edit-dialog/model/form-field.model';
import { Subject } from 'rxjs';
import { Team } from '../../team/model/team.model';
import { User } from '../../user/model/user.model';

export abstract class DefaultListComponent<T> {
	@ViewChild(MatPaginator) paginator: MatPaginator;

	@ViewChild(ListTableComponent) listTableComponent: ListTableComponent<T>;
	@ViewChild(SearchComponent) searchComponent: SearchComponent;

  id: any;
	title: string;
	columns: ListColumn[];
	searches: SearchPanel[];
	formFields: FormField[];
	@Input() isDialog: boolean = false;

	@Output() selectEvent: EventEmitter<T> = new EventEmitter();
	onSelect() {
		this.selectEvent.emit(this.getLastestSelection());
	}

	constructor(private service: CrudService<T>, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.id = this.getId();
    this.title = this.getTitle();
		this.columns = this.getColumns();
		this.searches = this.getSearches();
		this.formFields = this.getFormFields();
	}

  abstract getId(): any;
	abstract getTitle(): string;
	abstract getColumns(): ListColumn[];
	abstract getSearches(): SearchPanel[];
	abstract getFormFields(): FormField[];

	ngOnInit() {
		this.search();
	}

	refresh(): void {
		window.location.reload();
	}

	search() {
		this.listTableComponent.selection.clear();
		this.service.getList(this.listTableComponent.page, this.searches).subscribe(
			data => {
				this.listTableComponent.list = data;
			},
			error => {
				console.log(error.message);
				this.openSnackBar('예기치 않은 오류로 인해 조회가 실패하였습니다.', '확인');
			},
			() => {
				this.service.getTotalCount(this.searches).subscribe(
					data => {
						this.listTableComponent.length = data;
					},
					error => {
						console.log(error.message);
						this.openSnackBar('예기치 않은 오류로 인해 조회가 실패하였습니다.', '확인');
					},
					() => {
					}
				);
			}
		);
	}

	add(row: T) {
		this.service.add(row).subscribe(
			result => {
			},
			error => {
				console.log(error.message);
				this.openSnackBar('예기치 않은 오류로 인해 등록이 실패하였습니다.', '확인');
			},
			() => {
				this.search();
				this.openSnackBar('정상적으로 등록되었습니다.', '확인');
			}
		);
	}

	edit(row: T) {
		this.service.edit(row).subscribe(
			result => {
			},
			error => {
				console.log(error.message);
				this.openSnackBar('예기치 않은 오류로 인해 변경이 실패하였습니다.', '확인');
			},
			() => {
				this.search();
				this.openSnackBar('정상적으로 변경되었습니다.', '확인');
			}
		);
	}

	delete(row: T) {
		this.getSelection().forEach(selection => {
			this.service.delete(selection['id']).subscribe(
				result => {
				},
				error => {
					console.log(error.message);
					this.openSnackBar('예기치 않은 오류로 인해 삭제가 실패하였습니다.', '확인');
				},
				() => {
					this.search();
					this.openSnackBar('정상적으로 변경되었습니다.', '확인');
				}
			);
		});
		this.openSnackBar(this.getSelection().length + '건이 정상적으로 삭제되었습니다.', '확인');
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 5000
		});
	}

	getSelection(): T[] {
		return this.listTableComponent.selection.selected;
	}

	getLastestSelection(): T {
		const selection = this.listTableComponent.selection.selected;
		if (selection.length > 0)
			return selection[selection.length - 1];
		return null;
	}

	openEditDialog(isAdd: boolean) {
		let element: T = null;
		if (!isAdd) {
			const selection = this.listTableComponent.selection.selected;
			if (selection.length > 0)
				element = selection[selection.length - 1];
		}
		
		if (element) {
			Object.keys(key => {
				if (!Object.keys(element).find(key))
				element[key] = this.constructFormModel()[key];
			});
    } else element = this.constructFormModel();

		let dialogRef = this.dialog.open(EditDialogComponent, {
			data: {
        elementId: this.id,
				element: element, 
				formFields: this.formFields
			}
		});

		dialogRef.afterClosed().subscribe(element => {
			if (element) {
				(element.id) ? this.edit(element) : this.add(element);
			}
		});
	}
	
	activator<T>(type: { new(): T ;} ): T {
    return new type();
	}
	
	abstract constructFormModel() :T;
}