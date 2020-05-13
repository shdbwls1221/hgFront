import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Agent} from '../models/Agent';
import { AgentService} from '../service/agent.service';
import { PageEvent } from '@angular/material';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
   styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent  implements OnInit, OnChanges{
  contents : Agent[];
  agentId = -1;
  params = new HttpParams();
  constructor(private route: Router, private agentService : AgentService) { }
  ngOnInit() {
      // this.agentService.getAgentList()
      // .subscribe(data=> {this.agents = data});
      //this.agentService.getAgentList2(0,this.pageSize)
      this.agentService.getAgentList2(0,this.pageSize)
      .subscribe(data=> {
        console.log(data)
        this.contents = data.content;
        this.length = data.totalElements;
       // this.agents ;
      });
      console.log(this.columns);
  }
//   @Input() columns : [];
//   @Input() displayedColumns : any;
columns = [
    { columnDef: 'agentId',   header: 'agentId', cell: (element: Agent) => `${element.agentId}` },
    { columnDef: 'instName',  header: 'instName', cell: (element: Agent) => `${element.instName}`     },
    { columnDef: 'agentName', header: 'agentName', cell: (element: Agent) => `${element.agentName}`   },
    { columnDef: 'agentDesc', header: 'agentDesc', cell: (element: Agent) => `${element.agentDesc}`   },
    { columnDef: 'createDate', header: 'createDate',cell: (element: Agent) => `${element.createDate}`   },
    { columnDef: 'updateDate', header: 'updateDate', cell: (element: Agent) => `${element.updateDate}`   },
    { columnDef: 'routeName', header: 'routeName', cell: (element: Agent) => `${element.route.length==0 ? '':element.route[0].routeName}`   },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);


  getRecord(rowdata :any){
    console.log(rowdata);
    this.agentId =rowdata.agentId;
  }
  ngOnChanges(){
    // console.log(this.pageEvent);
  }
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output

  getPageData(pageEvent: PageEvent){
    this.agentService.getAgentList2(pageEvent.pageIndex,pageEvent.pageSize)
    .subscribe(data=> {
      console.log(data);
        this.contents = data.content;
        this.length = data.totalElements;
    });
  }


}
