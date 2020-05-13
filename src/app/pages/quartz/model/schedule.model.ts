import { ConInterface } from "./con-interface.model"

export class Schedule {

  trgId: string;
  trgGroup: string;
  cron: string;
  conInterface: ConInterface;
  nextFireTime: string;
  prevFireTime: string;
  trgState: string;
  
}
