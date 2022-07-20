import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {EMPTY, mergeMap, Observable, of, Subject} from 'rxjs';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.scss']
})
export class GoogleCallbackComponent implements OnDestroy {
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(private nbAuthService: NbAuthService, private router: Router, private http: HttpClient) {
    this.nbAuthService.authenticate('google')
      .pipe(takeUntil(this.destroy$), mergeMap((authResult: NbAuthResult) => {
        if (authResult.isFailure()) {
          this.router.navigateByUrl('/auth/login');
          return of(null);
        } else {
          return this.getGooleProfile(authResult.getToken().getPayload()['access_token']);
        }
      })).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      console.warn(res);
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGooleProfile(acess_token: string): Observable<any> {
    return this.http.get<any>(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${acess_token}`);
  }
}
