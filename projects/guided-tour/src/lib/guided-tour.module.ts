import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbButtonModule, NbCardModule, NbIconModule} from '@nebular/theme';
import {GuidedTourComponent} from './guided-tour.component';
import {NebularModule} from '../../../../src/app/shared/nebular-components/nebular.module';
import {GuidedTourService} from './guided-tour.service';
import {WindowRefService} from './windowref.service';

@NgModule({
  declarations: [GuidedTourComponent],
  imports: [CommonModule, NbCardModule, NbButtonModule, NbIconModule, NebularModule],
  providers: [WindowRefService],
  exports: [GuidedTourComponent],
  entryComponents: [GuidedTourComponent],
})
export class GuidedTourModule {
  public static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: GuidedTourModule,
      providers: [ErrorHandler, GuidedTourService],
    };
  }
}
