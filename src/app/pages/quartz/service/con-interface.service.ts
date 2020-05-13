import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../common/list-table/model/page.model';
import { SearchPanel } from '../../common/search/model/search-panel.model';
import { CrudService } from '../../common/default/default-service.service';
import { ConInterface } from '../model/con-interface.model';

@Injectable({
  providedIn: 'root'
})
export class ConInterfaceService implements CrudService<ConInterface>  {
  
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/intf';
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

    return this.http.get<ConInterface[]>(this.url, {params});
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

  get(id: string): Observable<ConInterface> {
    return this.http.get<ConInterface>(this.url + "/" + id);
  }
  
  add(conInterface: ConInterface): Observable<any> {
    return this.http.post<ConInterface>(this.url, conInterface);
  }

  edit(conInterface: ConInterface): Observable<any> {
    return this.http.put<ConInterface>(this.url, conInterface);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<ConInterface>(this.url + "/" + id);
  }

}
