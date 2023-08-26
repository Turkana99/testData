import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { countriesLookUp } from '../countryILookUp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AcceptDataComponent } from '../dialog/accept-data/accept-data.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-visit-country',
  templateUrl: './visit-country.component.html',
  styleUrls: ['./visit-country.component.scss'],
})
export class VisitCountryComponent implements OnInit {
  visitForm: FormGroup;
  myCountry: any;
  countryNames: any[] = [];
  countries: any[] = [];
  filteredCountries: any[] = [];
  allCountries: any[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private appService: AppService,
    public dialog: MatDialog
  ) {
    this.visitForm = this.formBuilder.group({
      country: ['', Validators.required],
      capital: ['', Validators.required],
      continent: ['', Validators.required],
      bordersCountries: ['', Validators.required],
      name: ['', Validators.required],
      personcount: ['', Validators.required],
      days: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(250)]],
    });
    this.visitForm.controls['capital'].disable(); // Angular input disable ucun yaziriq
    this.visitForm.controls['continent'].disable();
    this.visitForm.controls['bordersCountries'].disable();

    // ValueChanges input value deyisdiyi halda action ucun ist. olunur
    this.visitForm.controls['country'].valueChanges.subscribe((result) => {
      // Apiye muracieti birbasa burda yazdiq cunki ayri yazanda funk. apiden cavab almadan ise dusurdu
      this.appService.getCountryName(result).subscribe((response) => {
        // console.log(response);
        //setValue input-a value set etmek ucun ist. olunur
        this.visitForm.controls['capital'].setValue(
          response[0].capital.join(', ')
        );
        this.visitForm.controls['continent'].setValue(
          response[0].continents.join(', ')
        );
        this.visitForm.controls['bordersCountries'].setValue(
          // response[0].borders
          //   ? response[0].borders?.join(', ')
          //   : 'This country has no borders.'
          // Burada abbrivationa uygun olke adini getirmek ucun ayrica funk. ist. edirik.
          response[0].borders
            ? this.cca3ToFullCountryName(response[0].borders?.join(', '))
            : 'This country has no borders.'
        );
        // console.log(this.visitForm.getRawValue());
      });
    });
  }
  ngOnInit(): void {
    this.populateCountryOptions();
    this.getAllCountries();
  }
  //populateCountryOptions bu funk. real datanin kopyasinin uzerinde islemek ucun ist. olunur.
  populateCountryOptions() {
    this.countryNames = structuredClone(countriesLookUp);
  }
  // Name gore olke melumatlarini Apiden elde etmeyimize komek edir.
  getCountry(countryName: string) {
    this.appService.getCountryName(countryName).subscribe((response) => {
      return response[0];
    });
  }
  // Butun olkelerin datalarini Apiden getirmek ucun ist. olunan funk.
  getAllCountries() {
    this.appService.getAllCountries().subscribe((response: any[]) => {
      this.allCountries = response;
      console.log(this.allCountries);
    });
  }
  // Dialogumuzun acilmasi ucun ist. olunur
  openDialog() {
    const dialogRef = this.dialog.open(AcceptDataComponent, {
      width: '500px',
      position: {
        top: '250px',
      },
      data: {
        visitInfo: this.visitForm.getRawValue(), // Value yazmadiq cunki o halda set olunmus input datalari gelmeyecekdi.(Disable olan inputlar)
      },
      //
      scrollStrategy: new NoopScrollStrategy(),
    });
   // Dialog icerisine data-ni oturmek ucun ist. edilir.z
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //str => IRN, TKM, UZB - abbr uygun olke adlarini butov getirmek ucun ist. olunur.
  cca3ToFullCountryName(str: string) {
    console.log(str);
    let abbr = str.split(',').map((x) => x.trim());
    let countryNames: any[] = [];
    let result;

    // Turkana

    // this.allCountries.map((elem: any) => {
    //   for (let i = 0; i < abbr.length; i++) {
    //     if (elem.cca3 == abbr[i]) {
    //       countryNames.push(elem.name.common);
    //     }
    //   }
    // });

    // Imran - 1

    for (const elem of abbr) {
      let temp = this.allCountries.find((el) => {
        return el.cca3 == elem;
      });
      countryNames.push(temp.name.common);
    }

    result = countryNames.join(', ');
    console.log(result);

    return result;
  }
}
