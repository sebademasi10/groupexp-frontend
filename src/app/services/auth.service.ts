import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Login } from '../models/login.model';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _controllerName = 'auth';
  private currentSession: Session = null;
  public sessionChanged = new Subject<Session>();

  constructor(private http: HttpClient) {

  }

  getSession(): Session {
    return this.currentSession;
  }


  login(loginData: Login) {
    return this.http.post<Login>(`${this._controllerName}/login`, loginData)
  }

  logout() {

  }
}
