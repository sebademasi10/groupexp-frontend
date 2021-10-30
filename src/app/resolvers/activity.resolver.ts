import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../models/activity.model';
import { ActividadService } from '../services/actividad.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityResolver implements Resolve<Activity> {
  constructor(private activityService: ActividadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Activity> {
    return this.activityService.get(route.params['uid']).pipe(
      map((data: any) => data.activity)
    );
  }
}
