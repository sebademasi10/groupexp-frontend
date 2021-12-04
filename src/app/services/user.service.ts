import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _controllerName = 'users';

  constructor(private http: HttpClient) { }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${this._controllerName}`, user);
  }

  update(userId: string, user: User): Observable<User> {
    return this.http.post<User>(`${this._controllerName}/${userId}`, user)
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(token !== null);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this._controllerName}/${userId}`);
  }

  getAll() {
    return this.http.get(`${this._controllerName}`);
  }
}
