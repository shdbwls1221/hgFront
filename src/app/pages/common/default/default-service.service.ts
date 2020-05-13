import { Observable } from 'rxjs';
import { Page } from '../list-table/model/page.model';
import { SearchPanel } from '../search/model/search-panel.model';

export interface CrudService<T> {

  getList(page: Page, searches: SearchPanel[]): Observable<T[]>;
  getTotalCount(searches: SearchPanel[]): Observable<number>;
  get(id: any): Observable<T>;
  add(element: T): Observable<any>;
  edit(element: T): Observable<any>;
  delete(id: any, etc?: any): Observable<any>;
}
