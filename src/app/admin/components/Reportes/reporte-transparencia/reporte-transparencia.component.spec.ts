import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTransparenciaComponent } from './reporte-transparencia.component';

describe('ReporteTransparenciaComponent', () => {
  let component: ReporteTransparenciaComponent;
  let fixture: ComponentFixture<ReporteTransparenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteTransparenciaComponent]
    });
    fixture = TestBed.createComponent(ReporteTransparenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
