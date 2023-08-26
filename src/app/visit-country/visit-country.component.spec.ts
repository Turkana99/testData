import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCountryComponent } from './visit-country.component';

describe('VisitCountryComponent', () => {
  let component: VisitCountryComponent;
  let fixture: ComponentFixture<VisitCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitCountryComponent]
    });
    fixture = TestBed.createComponent(VisitCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
