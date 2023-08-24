import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myCountry: any; // Apiden gelen datani saxlamaq ucun ist. olunur
  countries: any[] = []; // All countries  siyahisini ozunde saxlayir
  filteredCountries: any[] = []; // Filterlenen arrayimiz
  filterStr = ''; // Filter valuemuz
  timeout: any; //
  // countryNames: any[]=[]; // Populate funk ucun  lookup kopyasini saxlayir ozunde

  constructor(private appService: AppService) {} // Dependency injection - Servisimizi konstruktora inject etmisik

  ngOnInit(): void {
    // this.getCountryName('Afghanistan');
    this.getAllCountries();

    // Map example
    // let arr: { name: string; surname: string }[] = [
    //   { name: 'Turkana', surname: 'Mammadova' },
    //   { name: 'Imran', surname: 'Ahmadov' },
    // ];

    // console.log(
    //   arr.map((elem: any) => {
    //     elem.fullName = elem.name + ' ' + elem.surname;
    //     return elem;
    //   })
    // );
  }
  // Dependency Injection - Servisimizden istifade ede bilmek ucun constructorda otururuk.

  getCountryName(countryName: String) {
    this.appService.getCountryName(countryName).subscribe((response) => {
      this.myCountry = response[0]; // Funksiyamiza oturduyumuz parametre gore tek element qaytarir
    });
  }

  getAllCountries() {
    this.appService.getAllCountries().subscribe((response: any[]) => {
      this.countries = response;
      this.filteredCountries = structuredClone(this.countries);
      console.log(response);
    });
  }

  getData(obj: any) {
    // language kimi bir cox elementli obyektin join ile string etmek ucun ist. edirik
    if (obj) {
      return Object.values(obj).join(', '); // String verir
      // Object.values(obj) - array verir
    }
    return;
  }

  getCurrencies(obj: any) {
    let result;
    if (obj) {
      result = Object.values(obj).map((elem: any) => {
        return elem.name; // Sadece name-lerden ibaret array elde edirem
      });
      return result.join(', '); // result join edib string aliram
    }
    return;
  }
  filterCountries(str: string) {
    console.log(this.timeout);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.common
          .toLocaleLowerCase()
          .includes(str.toLocaleLowerCase())
      );
    }, 1000);
  }
  // populateCountryOptions(){ // Bizde olan country lookupinin esas datalari uzerinde islememek ucun ist. edirik.
  //   this.countryNames=structuredClone(this.countryNames); // structedClone bize kopyanin klonlayir
  // }
}
