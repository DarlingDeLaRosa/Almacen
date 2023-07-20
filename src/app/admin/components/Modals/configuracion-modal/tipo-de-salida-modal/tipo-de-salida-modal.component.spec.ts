import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeSalidaModalComponent } from './tipo-de-salida-modal.component';

describe('TipoDeSalidaModalComponent', () => {
  let component: TipoDeSalidaModalComponent;
  let fixture: ComponentFixture<TipoDeSalidaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeSalidaModalComponent]
    });
    fixture = TestBed.createComponent(TipoDeSalidaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
