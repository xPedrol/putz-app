import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILocation, Location} from "../models/location.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(
    private http: HttpClient) {

  }

  getLocationByLocation(lat: number, lon: number): Observable<ILocation> {
    return this.http.get<ILocation>('https://nominatim.openstreetmap.org/reverse', {
      params: {
        // key: environment.LOCATION_IQ_KEY,
        lat,
        lon,
        format: 'json'
      }
    }).pipe(map(location => new Location(location)));
  }
}
