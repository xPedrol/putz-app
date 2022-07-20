import {Inject, Injectable} from '@angular/core';
import {AppConfig, IAppConfig} from '../models/config/app-config.model';
import {APP_CONFIG} from '../core/Injection-tokens/app-config.injection-token';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {
  config: IAppConfig;

  constructor(@Inject(APP_CONFIG) config: IAppConfig) {
    this.config = new AppConfig(config);
  }

}
