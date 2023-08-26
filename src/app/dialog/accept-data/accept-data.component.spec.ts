import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDataComponent } from './accept-data.component';

describe('AcceptDataComponent', () => {
  let component: AcceptDataComponent;
  let fixture: ComponentFixture<AcceptDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptDataComponent]
    });
    fixture = TestBed.createComponent(AcceptDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
