import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  login(login: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { login: login, password: password })
      .map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
