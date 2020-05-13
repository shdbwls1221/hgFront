import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Page } from '../../common/list-table/model/page.model';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { CrudService } from '../../common/default/default-service.service';

@Injectable()
export class UserService implements CrudService<User> {
  get(id: number): Observable<User> {
    return this.http.get<User>(this.url + "/" + id);
  }
  add(user: User): Observable<any> {
    return this.http.post<User>(this.url, user);
  }
  edit(user: User): Observable<any> {
    return this.http.put<User>(this.url, user);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<User>(this.url + "/" + id);
  }

  private url: string;

  
  //  constructor() {
  //  }
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/users';
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

    return this.http.get<User[]>(this.url, {params});
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

  
  // public getTeam(id: number) {
  //   return this.http.get<User>(this.teamsUrl + "/" + id);
  // }

  // public addTeam(user: User) {
  //   return this.http.post<User>(this.teamsUrl, user);
  // }

  // public updateTeam(user: User) {
  //   return this.http.put<User>(this.teamsUrl, user);
  // }

  // public deleteTeams(teams: User[]) {
  //   //return this.http.delete<User>(this.teamsUrl);
  // }

  // public deleteTeam(id: number) {
  //   return this.http.delete<User>(this.teamsUrl + "/" + id);
  // }
  
}
