import { Agent } from './Agent';

export class RouteO{
    routeId : String;
    routeName : String;
    routeDesc : String;
    createDate : Date= new Date();
    updateDate : Date= new Date();
    agent : Agent;
}
