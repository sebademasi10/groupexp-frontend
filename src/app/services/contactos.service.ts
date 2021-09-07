import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private _controllerName = 'users';

  constructor(
    private http: HttpClient
  ) { }

  get(userId: string) {
    return this.http.get(`${this._controllerName}/${userId}/contacts`);
  }

  add(userId: string, emailToAdd: string) {
    return this.http.post(`${this._controllerName}/${userId}/contacts`, { email: emailToAdd })
  }


}
