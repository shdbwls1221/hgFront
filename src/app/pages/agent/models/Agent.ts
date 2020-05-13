import { RouteO } from './Route';

export class Agent{
    agentId : String;
    instName : String;
    agentName : String;
    agentDesc : String;
    createDate : Date= new Date();
    updateDate : Date= new Date();
    route : RouteO[];
}
