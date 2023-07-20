import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalidasComponent } from './edit-salidas.component';

describe('EditSalidasComponent', () => {
  let component: EditSalidasComponent;
  let fixture: ComponentFixture<EditSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSalidasComponent]
    });
    fixture = TestBed.createComponent(EditSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
