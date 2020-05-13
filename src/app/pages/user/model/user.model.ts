import { Team } from "../../team/model/team.model";

export class User {
    id: number;
    name: string;
    email: string;
    addr: string;
    joinDate: Date;
    team: Team;
}
