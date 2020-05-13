import { Component } from '@angular/core';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { SearchOperation } from '../../common/search/model/search-operation.model';
import { Column } from '../../common/list-table/model/column.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormField } from '../../common/edit-dialog/model/form-field.model';
import { ScheduleService } from '../service/schedule.service';
import { DefaultListComponent } from '../../common/default/default-list.component';
import { Schedule } from '../model/schedule.model';
import { ConInterface } from '../model/con-interface.model';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent extends DefaultListComponent<Schedule> {

  constructFormModel(): Schedule {
    let schedule = new Schedule();
    schedule.trgId = "";
    schedule.trgGroup = "";
    schedule.cron = "";
    schedule.conInterface = new ConInterface();
    return schedule;
  }

  getId(): string {
    return 'trgId';
  }

  getTitle(): string {
    return '스케줄 목록 조회';
  }

  getFormFields(): FormField[] {
    return [
      {
        label: '인터페이스ID',
        key: 'conInterface',
        type: 'search',
        letter: 'intfName',
        searchModel: 'ConInterface',
        id: 'intfId'
      },
      {
        label: '크론스케줄',
        key: 'cron',
        type: 'text'
      }
    ];
  }

  getColumns(): Column[] {
    return [
      {
        columnDef: 'conInterface.instCode',
        key: 'conInterface.instCode',
        columnName: '기관코드',
        columnSize: '70px'
      },     
      {
        columnDef: 'conInterface.intfId',
        key: 'conInterface.intfId',
        columnName: '인터페이스ID'
      },
      {
        columnDef: 'conInterface.intfName',
        key: 'conInterface.intfName',
        columnName: '인터페이스명'
      },
      {
        columnDef: 'cron',
        key: 'cron',
        columnName: '크론스케줄'
      },
      {
        columnDef: 'prevFireTime',
        key: 'prevFireTime',
        columnName: '마지막실행시간'
      },
      {
        columnDef: 'trgState',
        key: 'trgState',
        columnName: '트리거상태'
      },
    ];
  }

  getSearches(): SearchPanel[] {
    let searches: SearchPanel[] = [
      {
        type: "text",
        label: "트리거 ID",
        value: "",
        key: 'trgId',
        condition: SearchOperation.Like
      },
      {
				type: "search",
				label: "인터페이스",
				value: "",
				key: 'conInterface',
				condition: SearchOperation.Like,
				searchModel: 'ConInterface',
				letter: 'intfName',
				searchKey: 'intfId',
				valueObj: ''
			}
    ];

    return searches;
  }

  constructor(private scheduleService: ScheduleService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    super(scheduleService, dialog, snackBar);
  }

	delete() {
		this.getSelection().forEach(selection => {
			this.scheduleService.delete(selection['trgId'], selection['trgGroup']).subscribe(
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

  runOnce() {
    this.getSelection().forEach(selection => {
      this.scheduleService.runOnce(selection).subscribe(
        result => {
        },
        error => {
          console.log(error.message);
          this.openSnackBar('예기치 않은 오류로 인해 스케줄 즉시실행에 실패하였습니다.', '확인');
        },
        () => {
          this.openSnackBar('정상적으로 즉시실행되었습니다.', '확인');
        }
      );
    });
    this.search();
  }

  resume() {
    this.getSelection().forEach(selection => {
      this.scheduleService.resume(selection).subscribe(
        result => {
        },
        error => {
          console.log(error.message);
          this.openSnackBar('예기치 않은 오류로 인해 스케줄 재개에 실패하였습니다.', '확인');
        },
        () => {
          this.openSnackBar('정상적으로 재개되었습니다.', '확인');
        }
      );
    });
    this.search();
  }

  pause() {
    this.getSelection().forEach(selection => {
      this.scheduleService.pause(selection).subscribe(
        result => {
        },
        error => {
          console.log(error.message);
          this.openSnackBar('예기치 않은 오류로 인해 스케줄 정지에 실패하였습니다.', '확인');
        },
        () => {
          this.openSnackBar('정상적으로 정지되었습니다.', '확인');
        }
      );
    });
    this.search();
  }

}
