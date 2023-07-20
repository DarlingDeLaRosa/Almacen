import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenAdminAppComponent } from './almacen-admin-app.component';

describe('AlmacenAdminAppComponent', () => {
  let component: AlmacenAdminAppComponent;
  let fixture: ComponentFixture<AlmacenAdminAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenAdminAppComponent]
    });
    fixture = TestBed.createComponent(AlmacenAdminAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
