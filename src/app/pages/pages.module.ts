import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { TeamListComponent } from './team/list/team-list.component';
import { UserListComponent } from './user/list/user-list.component';
import { TeamService } from './team/service/team.service';
import { UserService } from './user/service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './common/search/search.component';
import { ListTableComponent } from './common/list-table/list-table.component';
import { CrudButtonsComponent } from './common/crud-buttons/crud-buttons.component';
import { EditDialogComponent } from './common/edit-dialog/edit-dialog.component';
import { ScheduleListComponent } from './quartz/list/schedule-list.component';
import { ScheduleService } from './quartz/service/schedule.service';
import { ListDialogComponent } from './common/list-dialog/list-dialog.component';
import { AgentService } from './agent/service/agent.service';
import { AgentListComponent } from './agent/list/agent-list.component';
import { MetricModule } from './metric/metric.module';
import { OsMetricComponent } from './metric/os-metric/os-metric.component';
import { ConInterfaceListComponent } from './quartz/list/con-interface-list.component';
import { ConInterfaceService } from './quartz/service/con-interface.service';
//import { AppModule } from '../../app.module';

export const routes = [
  { path: '', redirectTo: 'team', pathMatch: 'full'},
  { path: 'user', component: UserListComponent, data: { breadcrumb: '유저 목록' }},
  { path: 'team', component: TeamListComponent, data: { breadcrumb: '팀 목록' }},
  { path: 'agent', component: AgentListComponent, data: { breadcrumb: 'Agent 목록' }},
  { path: 'metric/os', component: OsMetricComponent, data: { breadcrumb: '운영서버 메트릭'}},
  { path: 'schedule', component: ScheduleListComponent, data: { breadcrumb: '스케줄 목록' } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule, 
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MetricModule
  ],
  declarations: [
    TeamListComponent,
    UserListComponent,
    AgentListComponent,
    ScheduleListComponent,
    ConInterfaceListComponent,
    EditDialogComponent,
     SearchComponent,
     ListTableComponent,
     CrudButtonsComponent,
     ListDialogComponent
  ],
  providers: [
    TeamService,
    UserService,
    AgentService,
    ScheduleService,
    ConInterfaceService
  ],
  entryComponents:[
    EditDialogComponent,
    ListDialogComponent
  ]
})
export class PagesModule { }