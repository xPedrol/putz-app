import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Metrics, ThreadDump} from '../../models/config/metrics.model';
import {ApplicationConfigService} from './application-config.service';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class MetricsService {
  baseUrl = environment.API_URL_CONFIG;

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
  }

  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(this.applicationConfigService.getEndpointFor(`${this.baseUrl}management/jhimetrics`));
  }

  threadDump(): Observable<ThreadDump> {
    return this.http.get<ThreadDump>(this.applicationConfigService.getEndpointFor(`${this.baseUrl}management/threaddump`));
  }
}
