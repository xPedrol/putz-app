export interface ILocation {
  town: string;
  country: string;
  country_code: string;
  state: string;
  suburb: string;
  'ISO3166-2-lvl4': string;
  uf: string;
}

export class Location implements ILocation {
  'ISO3166-2-lvl4': string;
  country: string;
  country_code: string;
  state: string;
  suburb: string;
  town: string;
  uf: string;


  constructor(location: ILocation = {} as ILocation) {
    const address = location['address'];
    this['ISO3166-2-lvl4'] = address['ISO3166-2-lvl4'];
    if (address['ISO3166-2-lvl4']) {
      this.uf = address['ISO3166-2-lvl4'].split('-')[1].toUpperCase();
    }
    this.country = address.country;
    this.country_code = address.country_code;
    this.state = address.state;
    this.suburb = address.suburb;
    this.town = address.town;
  }
}
