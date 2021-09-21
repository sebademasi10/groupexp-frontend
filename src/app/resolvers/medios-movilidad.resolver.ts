import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MediosMovilidad } from '../models/medios-movilidad.model';
import { MediosMovilidadService } from '../services/medios-movilidad.service';

@Injectable({
  providedIn: 'root'
})
export class MediosMovilidadResolver implements Resolve<MediosMovilidad[]> {

  constructor(private mediosMovilidadService: MediosMovilidadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MediosMovilidad[]> {
    return this.mediosMovilidadService.get();
  }
}
