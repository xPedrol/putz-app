import {CountryCodeSourceEnum} from "./enums/country-code-source.model";

export interface IPhoneDetail {
  countryCode: number;
  countryCodeSource: CountryCodeSourceEnum;
  extension: string;
  italianLeadingZero: boolean;
  nationalNumber: number;
  numberOfLeadingZeros: number;
  preferredDomesticCarrierCode: string;
  rawInput: string;
}
