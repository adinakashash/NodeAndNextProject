import UserClass from "./user";
import { WorkerClass } from "./worker";
export enum ReportStatus {
    Pending = "Pending",
    InProcess = "InProcess",
    Fixed = "Fixed",
  }
  

  export enum ReportPriority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
  }
  
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
  
  export interface LatLng {
    lat: number;
    lng: number;
  }
  
  
  export interface Report {
    description: string;
    reportedBy: UserClass;
    handledBy: string;
    status: ReportStatus;
    priority: ReportPriority;
    reportImage: File|null;
    location: LatLng;
    address:string,
    reportType: ReportType|null;
  }
  
  export class ReportClass implements Report {
    description: string;
    reportedBy: UserClass;
    handledBy: string;
    status: ReportStatus;
    priority: ReportPriority;
    reportImage: File|null;
    location: LatLng;
    reportType: ReportType|null;
    address: string;

    constructor(
      description: string,
      reportedBy: UserClass,
      handledBy: string,
      status: ReportStatus,
      priority: ReportPriority,
      reportImage: File|null,
      location: LatLng,
      reportType: ReportType,
      address:string
    ) {
      this.description = description;
      this.reportedBy = reportedBy;
      this.handledBy = handledBy;
      this.status = status;
      this.priority = priority;
      this.reportImage = reportImage;
      this.location = location;
      this.reportType = reportType;
      this.address=address;
    }
  }
  