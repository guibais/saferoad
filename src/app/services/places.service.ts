/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//Google Places Imports

import { MapsAPILoader } from '@agm/core';

import { environment } from 'src/environments/environment';
export const googleAPIKey = environment.googleAPIKey;

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  //Google Places Variables
  placeDetailsService: any;
  placeServiceIsReady: true;
  selectedPlaces = [];

  constructor(
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader
  ) {
    this.mapsAPILoader.load().then(() => {
      this.placeDetailsService = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      this.placeServiceIsReady = true;
    });
  }

  getMyLocation() {
    return this.geolocation.getCurrentPosition();
  }

  getNearbyPlaces(location: any, place: string = null, name: string = null) {
    if (this.placeServiceIsReady) {
      return new Promise((resolve, reject) => {
        this.placeDetailsService.nearbySearch(
          {
            location: {
              lat: location.latitude,
              lng: location.longitude,
            },
            radius: 40000,
            types: place ? [place] : [''],
            name,
          },
          (res) => {
            if (res) {
              let parse = JSON.parse(JSON.stringify(res));
              resolve(parse);
            }
          }
        );
      });
    }
  }
}
