import { Injectable } from '@angular/core';

@Injectable()
export class MetricUrlService {

  getUrl(addr: string, dashboardName: string): string { 
    return "http://10.47.39.124:3000/d/" + addr + 
            "/" + dashboardName + "?&refresh=10s&fullscreen&theme=light";
  }
}
