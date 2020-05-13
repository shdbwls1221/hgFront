import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../model/team.model';
import { Page } from '../../common/list-table/model/page.model';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { CrudService } from '../../common/default/default-service.service';

@Injectable()
export class TeamService implements CrudService<Team> {
  get(id: number): Observable<Team> {
    return this.http.get<Team>(this.teamsUrl + "/" + id);
  }
  add(team: Team): Observable<any> {
    return this.http.post<Team>(this.teamsUrl, team);
  }
  edit(team: Team): Observable<any> {
    return this.http.put<Team>(this.teamsUrl, team);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<Team>(this.teamsUrl + "/" + id);
  }

  private teamsUrl: string;

  
  //  constructor() {
  //  }
  constructor(private http: HttpClient) {
    this.teamsUrl = 'http://localhost:8080/teams';
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

    return this.http.get<Team[]>(this.teamsUrl, {params});
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

    return this.http.get<number>(this.teamsUrl + "/count", {params});
  }

  
  // public getTeam(id: number) {
  //   return this.http.get<Team>(this.teamsUrl + "/" + id);
  // }

  // public addTeam(team: Team) {
  //   return this.http.post<Team>(this.teamsUrl, team);
  // }

  // public updateTeam(team: Team) {
  //   return this.http.put<Team>(this.teamsUrl, team);
  // }

  // public deleteTeams(teams: Team[]) {
  //   //return this.http.delete<Team>(this.teamsUrl);
  // }

  // public deleteTeam(id: number) {
  //   return this.http.delete<Team>(this.teamsUrl + "/" + id);
  // }
  
}
