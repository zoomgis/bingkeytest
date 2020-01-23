import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public getDataBingTest(key: string) {
    let testBingUrl = "http://dev.virtualearth.net/REST/v1/Locations?" +
      "countryRegion=TR" +
      "&c=TR" +
      "&adminDistrict=merkez" +
      "&addressLine=ANKARA" +
      "&maxResults=5" +
      "&includeNeighborhood=true" +
      "&key=" + key;

    return this.http.get(testBingUrl);
  }
}