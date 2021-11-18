import { Time } from "@angular/common";
import { MedioMovilidad } from "./medio-movilidad.model";
import { User } from "./user.model";

export class Activity {
    uid: string;
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
    creators: string[];
    participants: User[];
    isOwner: boolean;
    isActive: boolean;
}
