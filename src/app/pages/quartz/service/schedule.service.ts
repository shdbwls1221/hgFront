import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../common/list-table/model/page.model';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { CrudService } from '../../common/default/default-service.service';
import { Schedule } from '../model/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements CrudService<Schedule>  {
  
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/schedules';
  }

  getList(pageInfo: Page, searches: SearchPanel[]): Observable<any[]> {

    let searchArr: string[] = [];
    for (let i = 0; i < searches.length; i++) {
      let search = searches[i];
      if (search.value == undefined || !search.value) continue;
      let searchStr: string = '';
      searchStr += search.key;
      searchStr += search.condition;
      searchStr += search.value;
      searchArr.push(searchStr);
    }
    let searchStr: string = searchArr.join(",");

    let params = new HttpParams()
      .set('pNo', pageInfo.pageIndex.toString())
      .set('pSize', pageInfo.pageSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key)
      .set('search', searchStr);

    return this.http.get<Schedule[]>(this.url, {params});
  }
  
  getTotalCount(searches: SearchPanel[]) {
    let searchArr: string[] = [];
    for (let i = 0; i < searches.length; i++) {
      let search = searches[i];
      if (search.value == undefined || !search.value) continue;
      let searchStr: string = '';
      searchStr += search.key;
      searchStr += search.condition;
      searchStr += search.value;
      searchArr.push(searchStr);
    }
    let searchStr: string = searchArr.join(",");

    let params = new HttpParams()
      .set('search', searchStr);

    return this.http.get<number>(this.url + "/count", {params});
  }

  get(id: string): Observable<Schedule> {
    return this.http.get<Schedule>(this.url + "/" + id);
  }
  
  add(schedule: Schedule): Observable<any> {
    return this.http.post<Schedule>(this.url, schedule);
  }

  edit(schedule: Schedule): Observable<any> {
    return this.http.put<Schedule>(this.url, schedule);
  }

  delete(id: string, etc: any): Observable<any> {
    return this.http.delete(this.url + "/" + etc + "/" + id);
  }

  public runOnce(schedule: Schedule) {
    return this.http.get(this.url + "/runOnce/" + schedule.trgGroup + "/" + schedule.trgId);
  }

  public resume(schedule: Schedule) {
    return this.http.get(this.url + "/resume/" + schedule.trgGroup + "/" + schedule.trgId);
  }

  public resumeAll(group: string) {
    return this.http.get(this.url + "/resumeAll/" + group);
  }

  public pause(schedule: Schedule) {
    return this.http.get(this.url + "/pause/" + schedule.trgGroup + "/" + schedule.trgId);
  }

  public pauseAll(group: string) {
    return this.http.get(this.url + "/pauseAll/" + group); 
  }


}
