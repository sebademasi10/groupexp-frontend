import { Injectable } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private static instance: MapsService;

  private constructor() { }
  public static getInstance(): MapsService {
    return !MapsService.instance ? new MapsService() : MapsService.instance
  }

  public getLoader() {
    return new Loader({
      apiKey: "AIzaSyDdI-tTzdW4gTA34vzW-t4CMPtu6W0g6wg",
      version: "weekly"
    })
  }
}
