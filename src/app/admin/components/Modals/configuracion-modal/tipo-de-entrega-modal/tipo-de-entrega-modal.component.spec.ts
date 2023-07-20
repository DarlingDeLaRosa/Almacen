import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeEntregaModalComponent } from './tipo-de-entrega-modal.component';

describe('TipoDeEntregaModalComponent', () => {
  let component: TipoDeEntregaModalComponent;
  let fixture: ComponentFixture<TipoDeEntregaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeEntregaModalComponent]
    });
    fixture = TestBed.createComponent(TipoDeEntregaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
