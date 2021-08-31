import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediosMovilidad } from '../models/medios-movilidad';

@Injectable({
  providedIn: 'root'
})
export class MediosMovilidadService {

  private _controllerName = 'meansOfTransportation';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<MediosMovilidad[]> {
    return this.http.get<MediosMovilidad[]>(this._controllerName);
  }
}
