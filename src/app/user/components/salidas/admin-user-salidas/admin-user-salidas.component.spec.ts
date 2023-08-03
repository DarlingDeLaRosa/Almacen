import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserSalidasComponent } from './admin-user-salidas.component';

describe('AdminUserSalidasComponent', () => {
  let component: AdminUserSalidasComponent;
  let fixture: ComponentFixture<AdminUserSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserSalidasComponent]
    });
    fixture = TestBed.createComponent(AdminUserSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
