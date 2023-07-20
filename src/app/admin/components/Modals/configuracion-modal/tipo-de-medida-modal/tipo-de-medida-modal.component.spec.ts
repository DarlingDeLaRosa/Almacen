import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeMedidaModalComponent } from './tipo-de-medida-modal.component';

describe('TipoDeMedidaModalComponent', () => {
  let component: TipoDeMedidaModalComponent;
  let fixture: ComponentFixture<TipoDeMedidaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeMedidaModalComponent]
    });
    fixture = TestBed.createComponent(TipoDeMedidaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
