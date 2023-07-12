import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntradasComponent } from './admin-entradas.component';

describe('AdminEntradasComponent', () => {
  let component: AdminEntradasComponent;
  let fixture: ComponentFixture<AdminEntradasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEntradasComponent]
    });
    fixture = TestBed.createComponent(AdminEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
