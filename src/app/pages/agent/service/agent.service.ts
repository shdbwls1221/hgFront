import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Agent } from '../models/Agent';
import { PagingParams } from '../models/PagingParam';



const httpOptions= {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({providedIn: 'root'})
export class AgentService{
  constructor(private http: HttpClient){}

  private useUrl = 'http://localhost:8080'

  public getAgentList(){
    return this.http.get<Agent[]>(this.useUrl+"/agentList");
  }

  public createAgent(agent : any){
    console.log(agent);
    return this.http.post<Agent>(this.useUrl+"/agentInsert",agent);
  }
  public getAgent(id :Number){
    return this.http.get<Agent>(this.useUrl+'/agentId?id='+id);
  }
  public deleteAgent(id :Number){
    return this.http.get(this.useUrl+'/agentDelete?id='+id,);
  }

  public getAgentList2(page, size){
    return this.http.get<PagingParams>(this.useUrl+"/agentList2?page="+page+"&size="+size);
  }

  public getAgentList3(param :any){
    return this.http.get<PagingParams>(this.useUrl+"/agentList2",{params : param});
  }
}
