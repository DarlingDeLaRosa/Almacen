import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEntradasComponent } from './admin-user-entradas.component';

describe('AdminUserEntradasComponent', () => {
  let component: AdminUserEntradasComponent;
  let fixture: ComponentFixture<AdminUserEntradasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserEntradasComponent]
    });
    fixture = TestBed.createComponent(AdminUserEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
