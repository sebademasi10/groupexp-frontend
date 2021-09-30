import { Time } from "@angular/common";
import { MedioMovilidad } from "./medio-movilidad.model";

export class Activity {
    title: string;
    meanOfTransportation: MedioMovilidad;
    minAge: number;
    maxAge: number;
    startDate: Date;
    endDate: Date;
    startTime: Time;
    endTime: Time;
    description: string;

    constructor() {
        this.title = undefined;
        this.meanOfTransportation = undefined;
        this.minAge = undefined;
        this.maxAge = undefined;
        this.startDate = undefined;
        this.startDate = undefined;
        this.startTime = undefined;
        this.endTime = undefined;
        this.description = undefined;
    }
}
