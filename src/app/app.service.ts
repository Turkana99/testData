import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  // Servisimizi lazim olan klasslarda inject edib ist ede bilmek ucun
  providedIn: 'root', // Bu hisse yaratdigimiz servisi app module da tanitmaq ucun ist. edilir. Root app.module gosterir
})
export class AppService {
  constructor(private http: HttpClient) {
    // Api muraciet ucun  HTTP client ist. olunur
  }
  // Funksiyamiz parametr penceresi    funksiyamizin qaytaracagi tip
  getCountryName(countryName: String): Observable<any> {
    return this.http.get(`https://restcountries.com/v3.1/name/${countryName}`); // api link ve return data
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`https://restcountries.com/v3.1/all/`); // api link ve return data
  }
}
