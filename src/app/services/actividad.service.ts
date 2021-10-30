import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private readonly _controllerName = 'activities';
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get<Activity[]>(this._controllerName);
  }

  public save(activity: Activity) {
    return this.httpClient.post<Activity>(`${this._controllerName}`, activity).pipe(
      map(activity => activity.title)
    );
  }
}
