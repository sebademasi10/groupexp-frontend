import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MedioMovilidad } from '../models/medio-movilidad.model';
import { MediosMovilidadService } from '../services/medios-movilidad.service';

@Injectable({
  providedIn: 'root'
})
export class MediosMovilidadResolver implements Resolve<MedioMovilidad[]> {

  constructor(private mediosMovilidadService: MediosMovilidadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MedioMovilidad[]> {
    return this.mediosMovilidadService.get();
  }
}
