import { Time } from "@angular/common";
import { MedioMovilidad } from "./medio-movilidad.model";

export class Activity {
    title: string;
    meanOfTransportation: MedioMovilidad | string;
    fromCoordinates: google.maps.LatLngLiteral;
    toCoordinates: google.maps.LatLngLiteral;
    minAge: number;
    maxAge: number;
    startDate: Date;
    endDate: Date;
    startTime: Time;
    endTime: Time;
    description: string;
}
