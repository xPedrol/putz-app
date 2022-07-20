import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IViacepAddress} from '../models/external/viacepAddress.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExternalApisService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAddressByCEP(cep: string | number): Observable<IViacepAddress> {
    return this.http.get<IViacepAddress>(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }), withCredentials:false});
  }

  getCountiesByUF(uf:string):Observable<any>{
    return this.http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`, {withCredentials:false});
  }
}
