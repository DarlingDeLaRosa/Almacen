import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalidasComponent } from './admin-salidas.component';

describe('AdminSalidasComponent', () => {
  let component: AdminSalidasComponent;
  let fixture: ComponentFixture<AdminSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSalidasComponent]
    });
    fixture = TestBed.createComponent(AdminSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
