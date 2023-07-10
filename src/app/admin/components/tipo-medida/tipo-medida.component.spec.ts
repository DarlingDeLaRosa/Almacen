import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMedidaComponent } from './tipo-medida.component';

describe('TipoMedidaComponent', () => {
  let component: TipoMedidaComponent;
  let fixture: ComponentFixture<TipoMedidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoMedidaComponent]
    });
    fixture = TestBed.createComponent(TipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
