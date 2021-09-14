import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {

  private static requestSent = 0;
  private segundosEspera = 2000;
  private spinnerPrimario;

  constructor(private spinner: NgxSpinnerService) {
    this.spinner.getSpinner('primary').subscribe((s) => {
      this.spinnerPrimario = s;
    });
  }

  private static hayPeticionesPendientes(): boolean {
    return SpinnerInterceptor.requestSent > 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (++SpinnerInterceptor.requestSent === 1 && (!this.spinnerPrimario || !this.spinnerPrimario.show)) {
      this.spinner.show();
    }
    return next.handle(req).pipe(finalize(() => {
      --SpinnerInterceptor.requestSent;
      if (!SpinnerInterceptor.hayPeticionesPendientes()) {
        setTimeout(() => {
          if (!SpinnerInterceptor.hayPeticionesPendientes() && this.spinnerPrimario.show) {
            this.spinner.hide();
          }
        }, this.segundosEspera);
      }
    }));

  }
}
