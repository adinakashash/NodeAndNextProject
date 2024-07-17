// worker.ts
export enum TypeWorker {
    TrafficEngineer = "Traffic Engineer",
    Plumber = "Plumber",
    SanitationWorker = "Sanitation Worker",
    Electrician = "Electrician",
    RoadWorker = "Road Worker",
    SewageWorker = "Sewage Worker",
    Arborist = "Arborist",
    SignTechnician = "Sign Technician"
  }
  
  export interface User {
    id: string;
    // הוסף שדות נוספים של ה-User במידת הצורך
  }
  
  export interface Worker {
    user: User;
    typeEmployee: TypeWorker[];
    workerLocation: string;
    workerID: string;
  }
  
  export class WorkerClass implements Worker {
    user: User;
    typeEmployee: TypeWorker[];
    workerLocation: string;
    workerID: string;
  
    constructor(user: User, typeEmployee: TypeWorker[], workerLocation: string, workerID: string) {
      this.user = user;
      this.typeEmployee = typeEmployee;
      this.workerLocation = workerLocation;
      this.workerID = workerID;
    }
  
    // הוסף פונקציות נוספות במידת הצורך
  }
  