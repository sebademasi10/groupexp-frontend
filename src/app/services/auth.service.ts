import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  public loggedUserNameChanged = new Subject<string>();
  public userId = '';
  public loggedUserName = '';

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService
  ) {
    this.getLoggedUser();
  }

  getUserId() {
    const token = this.getToken();
    if (token) {
      this.userId = this.jwt.decodeToken(token)['uid'];
    }
    return this.userId;
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  getLoggedUser() {
    const token = this.getToken();
    if (token) {
      const data = this.jwt.decodeToken(token);
      this.loggedUserName = `${data['name']} ${data['surname']}`;
    }
    this.loggedUserNameChanged.next(this.loggedUserName);
    return this.loggedUserName;
  }

  getSession(): Session {
    return this.currentSession;
  }


  login(loginData: Login) {
    try {
      return this.http.post(`${this._controllerName}/login`, loginData)
    } catch (error) {
      throw error.error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedUserName = undefined;
    location.reload();
  }
}
