import {InjectionToken} from '@angular/core';
import {IAppConfig} from '../../models/config/app-config.model';

export const APP_CONFIG = new InjectionToken<IAppConfig>('APP_CONFIG');
