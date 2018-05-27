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

  searchObject(obj) {
    if (obj === 'pharmacies') {
      let params = new HttpParams().set("viewpoint1", "30.67382765576172,46.599921586650815")
      .set("viewpoint2", "30.75965834423828,46.34503197451403")
      .set("page", "1")
      .set("page_size", "50")
      .set("q", "аптеки")
      .set("region_id", "14")
      .set("type", "street,adm_div.city,foreign_city,crossroad,route,branch,adm_div.settlement,station,gate,building,adm_div.district,road,adm_div.division,adm_div.living_area,attraction,adm_div.place,adm_div,parking")
      .set("fields", "request_type,items.adm_div,items.attribute_groups,items.contact_groups,items.flags,items.address,items.rubrics,items.name_ex,items.point,items.geometry.centroid,items.region_id,items.external_content,items.org,items.group,items.schedule,items.ads.options,items.stat,items.reviews,items.purpose,search_type,context_rubrics,search_attributes,widgets,filters")
      .set("key", "ruoedw9225")
      return this.http.get<any>('https://catalog.api.2gis.ru/3.0/items?', { params: params });
      //return this.http.get<any>('https://catalog.api.2gis.ru/3.0/items?viewpoint1=30.67382765576172%2C46.599921586650815&viewpoint2=30.75965834423828%2C46.34503197451403&page=1&page_size=50&q=%D0%B0%D0%BF%D1%82%D0%B5%D0%BA%D0%B8&region_id=14&type=street%2Cadm_div.city%2Cforeign_city%2Ccrossroad%2Croute%2Cbranch%2Cadm_div.settlement%2Cstation%2Cgate%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div%2Cparking&fields=request_type%2Citems.adm_div%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&key=ruoedw9225');
    } else if (obj === 'gas_stations') {
      return this.http.get<any>('https://catalog.api.2gis.ru/3.0/items?viewpoint1=30.59486409960938%2C46.599921586650815&viewpoint2=30.83930990039063%2C46.34503197451403&page=1&page_size=12&q=%D0%B7%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B8&region_id=14&type=street%2Cadm_div.city%2Cforeign_city%2Ccrossroad%2Croute%2Cbranch%2Cadm_div.settlement%2Cstation%2Cgate%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div%2Cparking&fields=request_type%2Citems.adm_div%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&key=ruoedw9225');
    } else if (obj == 'schools') {
      return this.http.get<any>('https://catalog.api.2gis.ru/3.0/items?viewpoint1=29.987182285156262%2C47.023333950627794&viewpoint2=31.541747714843762%2C46.00459352315403&page=1&page_size=12&q=%D1%88%D0%BA%D0%BE%D0%BB%D1%8B&region_id=14&type=street%2Cadm_div.city%2Cforeign_city%2Ccrossroad%2Croute%2Cbranch%2Cadm_div.settlement%2Cstation%2Cgate%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div%2Cparking&fields=request_type%2Citems.adm_div%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&key=ruoedw9225');
    } else if (obj == 'restaurants') {
      return this.http.get<any>('https://catalog.api.2gis.ru/3.0/items?viewpoint1=30.67382808398437%2C47.023333950627794&viewpoint2=30.852355916015625%2C46.00459352315403&page=1&page_size=12&q=%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D1%8B&region_id=14&type=street%2Cadm_div.city%2Cforeign_city%2Ccrossroad%2Croute%2Cbranch%2Cadm_div.settlement%2Cstation%2Cgate%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div%2Cparking&fields=request_type%2Citems.adm_div%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&key=ruoedw9225');
    }
  }
}
