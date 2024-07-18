import UserClass from "./user";

export enum ReportType {
  Manager = "manager",
  General = "general",
  Crash = "crash",
  Water = "water",
  Trash = "trash",
  Electricity = "electricity",
  Pavement = "pavement",
  StreetLight = "street light",
  TrafficLight = "traffic light",
  Sewage = "sewage",
  Tree = "tree",
  Sign = "sign",
}
  
  export interface Worker {
    user: UserClass;
    typeEmployee: ReportType[];
    workerLocation: string;
    workerID: string;
  }
  
  export class WorkerClass implements Worker {
    user: UserClass;
    typeEmployee: ReportType[];
    workerLocation: string;
    workerID: string;
  
    constructor(user: UserClass, typeEmployee: ReportType[], workerLocation: string, workerID: string) {
      this.user = user;
      this.typeEmployee = typeEmployee;
      this.workerLocation = workerLocation;
      this.workerID = workerID;
    }
  
  }
  