import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule, HttpParams } from '@angular/common/http';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  saveMarkers(coord) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id;

    if(currentUser._id) {
      id = currentUser._id; 
    } else {
      id = currentUser.user._id;
    }
      
    return this.http.put<any>('http://localhost:3000/main', {coord, id})
    .map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    });
  }

  getUserMarkers() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id;

    if(currentUser._id) {
      id = currentUser._id; 
    } else {
      id = currentUser.user._id;
    }

    let params = new HttpParams().set("id", id) 
    return this.http.get<any>('http://localhost:3000/main', {params: params});
  }
}
