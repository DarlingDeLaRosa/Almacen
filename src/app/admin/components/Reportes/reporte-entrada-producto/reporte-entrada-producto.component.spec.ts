import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEntradaProductoComponent } from './reporte-entrada-producto.component';

describe('ReporteEntradaProductoComponent', () => {
  let component: ReporteEntradaProductoComponent;
  let fixture: ComponentFixture<ReporteEntradaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteEntradaProductoComponent]
    });
    fixture = TestBed.createComponent(ReporteEntradaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
