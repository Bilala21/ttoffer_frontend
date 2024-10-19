import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenizedInterceptor implements HttpInterceptor {
  private isErrorShown = false;
  languageCountry:string='';

  constructor(
    private router: Router,
  ) {
    // this.languageCountry = this.secureStorageService.languageCountry ;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authToken = this.authService.getPortalAccessToken();
    const token = localStorage.getItem('authToken');

    const timeZoneOffset = this.getOffsetInHours();

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {

          // if (error.status === 401) {
          //   return from(this.handle401Error()).pipe(
          //     switchMap(() => {
          //       const newAuthToken = this.authService.getPortalAccessToken();
          //       const newAuthReq = req.clone({
          //         setHeaders: {
          //           Authorization: `Bearer ${newAuthToken!.accessToken}`,
          //           'Time-Zone-Offset': timeZoneOffset.toString(),
          //         },
          //       });
          //       return next.handle(newAuthReq);
          //     })
          //   );
          // }
          // if ((error.status === 500 || error.status === 0) && !this.isErrorShown) {
            this.isErrorShown = true;
            // this.router.navigate(['/',this.languageCountry,this.componentRoutes.ServerError]);
            // this.router.navigate(['/']);
          // }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }

  // private async handle401Error(): Promise<void> {
  //   await this.authService.getClientAuthToken();
  // }

  getOffsetInHours(): number {
    const timeZoneOffsetMinutes: number = new Date().getTimezoneOffset();
    const timeZoneOffsetHours: number = timeZoneOffsetMinutes / 60;
    return -1 * timeZoneOffsetHours;
  }

}
