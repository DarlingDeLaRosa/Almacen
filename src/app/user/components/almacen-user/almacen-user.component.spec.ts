import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenUserComponent } from './almacen-user.component';

describe('AlmacenUserComponent', () => {
  let component: AlmacenUserComponent;
  let fixture: ComponentFixture<AlmacenUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenUserComponent]
    });
    fixture = TestBed.createComponent(AlmacenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
