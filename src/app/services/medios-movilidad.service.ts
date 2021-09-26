import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedioMovilidad } from '../models/medio-movilidad.model';

@Injectable({
  providedIn: 'root'
})
export class MediosMovilidadService {

  private _controllerName = 'meansOfTransportation';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<MedioMovilidad[]> {
    return this.http.get<MedioMovilidad[]>(this._controllerName);
  }
}
