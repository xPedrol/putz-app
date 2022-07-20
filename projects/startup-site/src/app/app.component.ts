import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, Router} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {filter} from 'rxjs/operators';
import {AccountService} from "../../../../src/app/services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})
export class AppComponent {

  location: any;
  routerSubscription: any;
  title: "";

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.recallJsFuntions();
    this.accountService.getAccount().subscribe();
  }

  recallJsFuntions() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }

}
