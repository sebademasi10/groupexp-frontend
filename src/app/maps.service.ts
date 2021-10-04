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
      apiKey: "AIzaSyC-8mU1nhu6OkXtggKptk7QxCBWYQgTvYI",
      version: "weekly"
    })
  }
}
