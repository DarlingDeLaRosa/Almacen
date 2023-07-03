import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenAppComponent } from './almacen-app.component';

describe('AlmacenAppComponent', () => {
  let component: AlmacenAppComponent;
  let fixture: ComponentFixture<AlmacenAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenAppComponent]
    });
    fixture = TestBed.createComponent(AlmacenAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
