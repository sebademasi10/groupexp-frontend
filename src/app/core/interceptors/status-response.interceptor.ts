import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';

@Injectable()
export class StatusResponseInterceptor implements HttpInterceptor {
  private static notificacion401Habilitada = false;

  constructor(private router: Router,
    private snackBarService: SnackBarService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (req.url.endsWith('login') && event instanceof HttpResponse) {
          return event.headers;
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 400:
              this.snackBarService.openSnackBar(err.error, false);
              break;
            case 401:
              this.snackBarService.openSnackBar(err.error, false);
              break;
            case 409:
              this.snackBarService.openSnackBar(err.error, false);
              break;
            case 500:
              this.snackBarService.openSnackBar(err.error, false);
              break;
            default:
              break;
          }
        }
      })
    );
  }
}
