import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  saveMarkers(coord) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id = currentUser._id;    
    return this.http.put<any>('http://localhost:3000/main', {coord, id})
    .map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    });
  }
}
