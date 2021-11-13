import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private readonly _controllerName = 'activities';
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this._controllerName).pipe(
      map((data: any) => data.activities)
    );
  }

  public get(uid: string): Observable<Activity> {
    return this.httpClient.get<Activity>(`${this._controllerName}/${uid}`);
  }

  public save(activity: Activity) {
    return this.httpClient.post<Activity>(`${this._controllerName}`, activity).pipe(
      map(activity => activity.title)
    );
  }
  public update(_activity: Activity): Observable<any> {
    const uid = _activity.uid;
    return this.httpClient.patch(`${this._controllerName}/${uid}`, _activity);
  }
}
