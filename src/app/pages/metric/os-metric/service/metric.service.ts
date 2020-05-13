import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Metric } from '../model/os-metric';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private url: string = 'http://localhost:8080/metric';

  constructor(private http: HttpClient) { 

  }

  public findOSMetricList() : Observable<Metric[]> {
    
    return this.http.get<Metric[]>(this.url + "/os");
  }
}
