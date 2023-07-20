import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntradasComponent } from './edit-entradas.component';

describe('EditEntradasComponent', () => {
  let component: EditEntradasComponent;
  let fixture: ComponentFixture<EditEntradasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEntradasComponent]
    });
    fixture = TestBed.createComponent(EditEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
