import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalidasComponent } from './user-salidas.component';

describe('UserSalidasComponent', () => {
  let component: UserSalidasComponent;
  let fixture: ComponentFixture<UserSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSalidasComponent]
    });
    fixture = TestBed.createComponent(UserSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
