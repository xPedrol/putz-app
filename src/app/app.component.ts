import {Component} from '@angular/core';
import {AccountService} from './services/account.service';
import {Router} from '@angular/router';
import {SharedService} from './shared/shared.service';
import {TranslateService} from '@ngx-translate/core';
import {headTitle} from './constants/headTitle.constants';
// import {SwPush} from '@angular/service-worker';
import {ConfigurationService} from "./services/config/configuration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = headTitle;

  constructor(
    public accountService: AccountService,
    public router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,

    // private swPush: SwPush,
  ) {
    // if (environment.production) {
    //   this.subscribeToNotifications();
    // }
    this.sharedService.setTheme();
    const fontSize = this.sharedService.getFontSize();
    if (fontSize) {
      this.sharedService.setFontSize(fontSize);
    }
    // }
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('pt');
  }

  // subscribeToNotifications() {
  // this.swPush.subscription.subscribe(sub => {
  //   if (!sub) {
  //     this.swPush.requestSubscription({
  //       serverPublicKey: environment.VAPID.publicKey
  //     })
  //       .then(sub => {
  //         console.warn(sub);
  //       })
  //       .catch(err => console.error('Could not subscribe to notifications', err));
  //   }
  // });
  // }

}
