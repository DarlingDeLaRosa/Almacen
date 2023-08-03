import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserEntradasComponent } from './edit-user-entradas.component';

describe('EditUserEntradasComponent', () => {
  let component: EditUserEntradasComponent;
  let fixture: ComponentFixture<EditUserEntradasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserEntradasComponent]
    });
    fixture = TestBed.createComponent(EditUserEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
