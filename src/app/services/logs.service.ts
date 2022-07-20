import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Level, LoggersResponse} from '../models/config/log.model';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class LogsService {
  baseUrl = environment.API_URL_CONFIG;

  constructor(private http: HttpClient) {
  }

  changeLevel(name: string, configuredLevel: Level): Observable<{}> {
    return this.http.post(this.baseUrl + 'management/loggers/' + name, {configuredLevel});
  }

  findAll(req?:any): Observable<LoggersResponse> {
    return this.http.get<LoggersResponse>(this.baseUrl + 'management/loggers');
  }
}
