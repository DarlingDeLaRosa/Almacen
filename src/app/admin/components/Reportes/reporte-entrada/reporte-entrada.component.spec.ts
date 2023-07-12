import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEntradaComponent } from './reporte-entrada.component';

describe('ReporteEntradaComponent', () => {
  let component: ReporteEntradaComponent;
  let fixture: ComponentFixture<ReporteEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteEntradaComponent]
    });
    fixture = TestBed.createComponent(ReporteEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
