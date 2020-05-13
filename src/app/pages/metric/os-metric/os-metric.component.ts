import { Component, OnInit } from '@angular/core';
import { Metric } from './model/os-metric';
import { MetricUrlService } from './service/metric-url.service';
import { MetricService } from './service/metric.service';


@Component({
  selector: 'os-metric',
  templateUrl: './os-metric.component.html',
  styleUrls: [
    './os-metric.component.css'
  ]
})
export class OsMetricComponent implements OnInit {

  osList: Metric[];
  selectedOsId: string;
  selectedOs: Metric;
  url: string;
 

  constructor(
    private metricService: MetricService,
    private urlService: MetricUrlService) {}

  ngOnInit() {
    this.metricService.findOSMetricList().subscribe(data => {
      this.osList = data;
    });
    
  }

  selectOSMetric() {
    for(let i=0; i<this.osList.length; i++) {
      if(this.osList[i].metricId == this.selectedOsId) {
        this.selectedOs = this.osList[i];
      }
    }
   
    this.url = this.urlService.getUrl(this.selectedOs.addr, this.selectedOs.dashboardName);
  }

  onChange(osId: string) {
    this.selectedOsId = osId;
   }

}
