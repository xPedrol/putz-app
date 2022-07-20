import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApplicationConfigService} from './application-config.service';
import {Bean, Beans, ConfigProps, Env, PropertySource} from '../../models/configuration.model';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class ConfigurationService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
  }

  getBeans(): Observable<Bean[]> {
    return this.http.get<ConfigProps>(`${environment.API_URL_CONFIG}management/configprops`).pipe(
      map(configProps =>
        Object.values(
          Object.values(configProps.contexts)
            .map((context: any) => context.beans)
            .reduce((allBeans: Beans, contextBeans: Beans) => ({...allBeans, ...contextBeans}))
        )
      )
    );
  }

  getPropertySources(): Observable<PropertySource[]> {
    return this.http.get<Env>(`${environment.API_URL_CONFIG}management/env`).pipe(map(env => env.propertySources));
  }

  getManagementInfo(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL_CONFIG}management/info`);
  }

}
