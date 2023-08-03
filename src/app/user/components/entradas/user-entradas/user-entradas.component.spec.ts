import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntradasComponent } from './user-entradas.component';

describe('UserEntradasComponent', () => {
  let component: UserEntradasComponent;
  let fixture: ComponentFixture<UserEntradasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEntradasComponent]
    });
    fixture = TestBed.createComponent(UserEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
