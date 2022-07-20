import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createRequestOption} from "../../core/utils/request-util";
import {IPerson} from "../../models/person.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {EntityArrayResponseType} from "../person.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigButtonsService {

  constructor(
    private http: HttpClient
  ) {
  }

  query(url, req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http
      .delete<IPerson[]>(`${environment.API_URL}${url}`, {
        params: options
      });
  }
}
