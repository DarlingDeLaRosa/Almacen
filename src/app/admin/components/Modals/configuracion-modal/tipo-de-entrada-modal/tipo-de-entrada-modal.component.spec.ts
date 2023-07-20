import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeEntradaModalComponent } from './tipo-de-entrada-modal.component';

describe('TipoDeEntradaModalComponent', () => {
  let component: TipoDeEntradaModalComponent;
  let fixture: ComponentFixture<TipoDeEntradaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeEntradaModalComponent]
    });
    fixture = TestBed.createComponent(TipoDeEntradaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
