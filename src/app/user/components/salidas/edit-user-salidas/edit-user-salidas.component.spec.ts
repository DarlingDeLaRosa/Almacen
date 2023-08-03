import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSalidasComponent } from './edit-user-salidas.component';

describe('EditUserSalidasComponent', () => {
  let component: EditUserSalidasComponent;
  let fixture: ComponentFixture<EditUserSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserSalidasComponent]
    });
    fixture = TestBed.createComponent(EditUserSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
