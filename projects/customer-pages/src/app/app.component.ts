import {Component} from '@angular/core';
import {NbIconLibraries} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../../../../src/app/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customer-pages';

  constructor(
    private iconLibraries: NbIconLibraries,
    private translate: TranslateService,
    private sharedService: SharedService
  ) {
    // this.iconLibraries.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('far', {packClass: 'far', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('fab', {packClass: 'fab', iconClassPrefix: 'fa'});
    // this.iconLibraries.registerFontPack('test');
    this.sharedService.setTheme();
    const fontSize = this.sharedService.getFontSize();
    if (fontSize) {
      this.sharedService.setFontSize(fontSize);
    }
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('pt');
  }
}
