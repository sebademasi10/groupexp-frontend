import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ContactosService } from '../services/contactos.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolver implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private contactosService: ContactosService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userId = this.authService.getUserId();
    return this.contactosService.get(userId)
  }
}
