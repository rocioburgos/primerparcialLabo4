import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApipaisesService {
  private api:string = 'https://restcountries.com/v3.1/';
  
  constructor(public http: HttpClient) { }



  getAllCountries():Observable<any> {
    return this.http.get(this.api + 'all');
   // return this.http.get<Pais[]>(`${this.api}/all`);
  }

  traerEuropa(){
    return this.http.get('https://restcountries.com/v3.1/region/europe');
  }

  traerAfrica(){
    return this.http.get('https://restcountries.com/v3.1/region/africa');
  }

}
