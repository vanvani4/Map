import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule, HttpParams } from '@angular/common/http';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  saveMarkers(coord) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id;

    if (currentUser._id) {
      id = currentUser._id;
    } else {
      id = currentUser.user._id;
    }

    return this.http.put<any>('http://localhost:3000/main', { coord, id })
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

    if (currentUser._id) {
      id = currentUser._id;
    } else {
      id = currentUser.user._id;
    }

    let params = new HttpParams().set("id", id)
    return this.http.get<any>('http://localhost:3000/main', { params: params });
  }

  searchObject(obj, coord1, coord2, page) {
    let viewpoint1: string = coord1.lng + ',' + coord1.lat;
    let viewpoint2: string = coord2.lng + ',' + coord2.lat;
    let params = new HttpParams().set("viewpoint1", viewpoint1)
      .set("viewpoint2", viewpoint2)
      .set("page", page)
      .set("page_size", "50")
      .set("q", obj)
      .set("region_id", "14")
      .set("type", "street,adm_div.city,foreign_city,crossroad,route,branch,adm_div.settlement,station,gate,building,adm_div.district,road,adm_div.division,adm_div.living_area,attraction,adm_div.place,adm_div,parking")
      .set("fields", "request_type,items.adm_div,items.attribute_groups,items.contact_groups,items.flags,items.address,items.rubrics,items.name_ex,items.point,items.geometry.centroid,items.region_id,items.external_content,items.org,items.group,items.schedule,items.ads.options,items.stat,items.reviews,items.purpose,search_type,context_rubrics,search_attributes,widgets,filters")
      .set("key", "ruoedw9225")
    return this.http.get<any>('https://catalog.api.2gis.ru/3.0/items?', { params: params });
  }
}
