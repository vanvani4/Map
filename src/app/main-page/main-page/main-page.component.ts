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
  data: any;

  constructor(private authenticationService: AuthenticationService, private mainService: MainService) { }

  ngOnInit() {
    this.createMap();
    this.addGeolocation();
    this.addMarkers();
    this.getData()
  }

  createMap() {
    DG.then(() => {
      this.map = DG.map('map', {
        center: [46.47, 30.74],
        zoom: 15
      });
      DG.control.location().addTo(this.map);
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
    console.log(this.map.getCenter());
    //this.authenticationService.logout();
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

  findPharmacies() {
    this.mainService.searchObject('pharmacies')
      .subscribe(
        data => {
          for (let item of data.result.items) {
            console.log(item.point);
            DG.then(() => {
              DG.marker([item.point.lat, item.point.lon]).addTo(this.map)
            });
          }
        });
  }

  findGaStations() {
    this.mainService.searchObject('gas_stations')
      .subscribe(
        data => {
          for (let item of data.result.items) {
            console.log(item.point);
            DG.then(() => {
              DG.marker([item.point.lat, item.point.lon]).addTo(this.map)
            });
          }
        });
  }

  findSchools() {
    this.mainService.searchObject('schools')
      .subscribe(
        data => {
          for (let item of data.result.items) {
            console.log(item.point);
            DG.then(() => {
              DG.marker([item.point.lat, item.point.lon]).addTo(this.map)
            });
          }
        });
  }

  findRestaurants() {
    this.mainService.searchObject('restaurants')
    .subscribe(
      data => {
        for (let item of data.result.items) {
          console.log(item.point);
          DG.then(() => {
            DG.marker([item.point.lat, item.point.lon]).addTo(this.map)
          });
        }
      });
  }

  getData() {
    console.log(this.data);
  }
}
