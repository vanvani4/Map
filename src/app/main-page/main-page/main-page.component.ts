import { Component, OnInit } from '@angular/core';
import * as DG from '2gis-maps';
import { AuthenticationService } from '../../guard/authentication.service';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  map: any;
  markers: any;
  data: any;

  constructor(private authenticationService: AuthenticationService, 
              private mainService: MainService, 
              private router: Router) { }

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

  findPharmacies() {
    this.hideMarkers();
    let coord1 = this.map.getBounds().getNorthWest();
    let coord2 = this.map.getBounds().getSouthEast();
    let page = 1;
    this.mainService.searchObject('аптеки', coord1, coord2, page)
      .subscribe(
        data => {
          let totalPages = data.result.total / 50;
          let integerTotalPages = Math.floor(totalPages);
          for (let i = integerTotalPages + 1; i > 1; i--) {
            this.mainService.searchObject('аптеки', coord1, coord2, i)
              .subscribe(
                data => {
                  for (let item of data.result.items) {
                    if (item.point.lat < coord1.lat &&
                      item.point.lat > coord2.lat &&
                      item.point.lon > coord1.lng &&
                      item.point.lon < coord2.lng) {
                      DG.then(() => {
                        DG.marker([item.point.lat, item.point.lon])
                          .addTo(this.markers).bindPopup(item.name);
                      });
                    }
                  }
                });
          }
          for (let item of data.result.items) {
            if (item.point.lat < coord1.lat &&
              item.point.lat > coord2.lat &&
              item.point.lon > coord1.lng &&
              item.point.lon < coord2.lng) {
              DG.then(() => {
                DG.marker([item.point.lat, item.point.lon])
                  .addTo(this.markers).bindPopup(item.name);
              });
            }
          }
        });
    this.markers.addTo(this.map);
  }

  findGasStations() {
    this.hideMarkers();
    let coord1 = this.map.getBounds().getNorthWest();
    let coord2 = this.map.getBounds().getSouthEast();
    let page = 1;
    this.mainService.searchObject('заправки', coord1, coord2, page)
      .subscribe(
        data => {
          let totalPages = data.result.total / 50;
          let integerTotalPages = Math.floor(totalPages);
          for (let i = integerTotalPages + 1; i > 1; i--) {
            this.mainService.searchObject('заправки', coord1, coord2, i)
              .subscribe(
                data => {
                  for (let item of data.result.items) {
                    if (item.point.lat < coord1.lat &&
                      item.point.lat > coord2.lat &&
                      item.point.lon > coord1.lng &&
                      item.point.lon < coord2.lng) {
                      DG.then(() => {
                        DG.marker([item.point.lat, item.point.lon])
                          .addTo(this.markers).bindPopup(item.name);
                      });
                    }
                  }
                });
          }
          for (let item of data.result.items) {
            if (item.point.lat < coord1.lat &&
              item.point.lat > coord2.lat &&
              item.point.lon > coord1.lng &&
              item.point.lon < coord2.lng) {
              DG.then(() => {
                DG.marker([item.point.lat, item.point.lon])
                  .addTo(this.markers).bindPopup(item.name);
              });
            }
          }
        });
    this.markers.addTo(this.map);
  }

  findSchools() {
    this.hideMarkers();
    let coord1 = this.map.getBounds().getNorthWest();
    let coord2 = this.map.getBounds().getSouthEast();
    let page = 1;
    this.mainService.searchObject('школы', coord1, coord2, page)
      .subscribe(
        data => {
          let totalPages = data.result.total / 50;
          let integerTotalPages = Math.floor(totalPages);
          for (let i = integerTotalPages + 1; i > 1; i--) {
            this.mainService.searchObject('школы', coord1, coord2, i)
              .subscribe(
                data => {
                  for (let item of data.result.items) {
                    if (item.point.lat < coord1.lat &&
                      item.point.lat > coord2.lat &&
                      item.point.lon > coord1.lng &&
                      item.point.lon < coord2.lng) {
                      DG.then(() => {
                        DG.marker([item.point.lat, item.point.lon])
                          .addTo(this.markers).bindPopup(item.name);
                      });
                    }
                  }
                });
          }
          for (let item of data.result.items) {
            if (item.point.lat < coord1.lat &&
              item.point.lat > coord2.lat &&
              item.point.lon > coord1.lng &&
              item.point.lon < coord2.lng) {
              DG.then(() => {
                DG.marker([item.point.lat, item.point.lon])
                  .addTo(this.markers).bindPopup(item.name);
              });
            }
          }
        });
    this.markers.addTo(this.map);
  }

  findRestaurants() {
    this.hideMarkers();
    let coord1 = this.map.getBounds().getNorthWest();
    let coord2 = this.map.getBounds().getSouthEast();
    let page = 1;
    this.mainService.searchObject('рестораны', coord1, coord2, page)
      .subscribe(
        data => {
          let totalPages = data.result.total / 50;
          let integerTotalPages = Math.floor(totalPages);
          for (let i = integerTotalPages + 1; i > 1; i--) {
            this.mainService.searchObject('рестораны', coord1, coord2, i)
              .subscribe(
                data => {
                  for (let item of data.result.items) {
                    if (item.point.lat < coord1.lat &&
                      item.point.lat > coord2.lat &&
                      item.point.lon > coord1.lng &&
                      item.point.lon < coord2.lng) {
                      DG.then(() => {
                        DG.marker([item.point.lat, item.point.lon])
                          .addTo(this.markers).bindPopup(item.name);
                      });
                    }
                  }
                });
          }
          for (let item of data.result.items) {
            if (item.point.lat < coord1.lat &&
              item.point.lat > coord2.lat &&
              item.point.lon > coord1.lng &&
              item.point.lon < coord2.lng) {
              DG.then(() => {
                DG.marker([item.point.lat, item.point.lon])
                  .addTo(this.markers).bindPopup(item.name);
              });
            }
          }
        });
    this.markers.addTo(this.map);
  }

  hideMarkers() {
    this.markers.removeFrom(this.map);
    this.markers._layers = {};
  }

  aboutAuthor() {
    this.router.navigate(['about']);
  }
}
