import { Component, OnInit } from '@angular/core';
import * as DG from '2gis-maps';
import { AuthenticationService } from '../../guard/authentication.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  map: any;
  markers: any;

  constructor(private authenticationService: AuthenticationService, private mainService: MainService) { }

  ngOnInit() {
    this.createMap();
    this.addGeolocation();
    this.addMarkers();
  }

  createMap() {
    DG.then(() => {
      this.map = DG.map('map', {
        center: [46.47, 30.74],
        zoom: 15
      });
    });
  }

  addGeolocation() {
    DG.then(() => {
      this.map.locate({ setView: true, watch: true })
        .on('locationfound', (e) => {
          let marker = DG.marker([e.latitude, e.longitude]).addTo(this.map);
        })
        .on('locationerror', (e) => {
          DG.popup()
            .setLatLng(this.map.getCenter())
            .setContent('Location access disconnected')
            .openOn(this.map);
        });
    });
  }

  addMarkers() {
    DG.then(() => {
      this.markers = DG.featureGroup();
      this.map.on('click', (e) => {
        DG.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map).addTo(this.markers);
      });
    });
  }

  // showMarkers() {
  //   DG.then(() => {
  //     this.markers.addTo(this.map);
  //     this.map.fitBounds(this.markers.getBounds());
  //   });
  // }

  saveMarkers() {
    let layers = this.markers._layers;
    let coord = [];

    for (let prop in layers) {
      const markers = layers[prop];
      coord.push(markers.getLatLng());
    }

    this.mainService.saveMarkers(coord)
      .subscribe(
        data => {
          DG.then(() => {
            this.markers = DG.featureGroup();
          });
        });
  }

  logOut() {
    this.authenticationService.logout();
  }

  showMarkers() {
    this.mainService.getUserMarkers()
      .subscribe(
        markers => {
          DG.then(() => {
            let userMarkers = DG.featureGroup();
            for (let item of markers) {
              for (let marker of item) {
                DG.marker([marker.lat, marker.lng]).addTo(userMarkers);
              }
            }
            userMarkers.addTo(this.map);
            this.map.fitBounds(userMarkers.getBounds());
          });
        });
  }
}
