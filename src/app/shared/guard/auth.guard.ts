import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthGuard implements CanActivateChild {
  BETWEEN_SLASHES = '^\/[^\/]+\/?([^\/]+)\/?';
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,) {

  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (state.url === '/' || state.url === '/login') return true;
    return true

  }
}
