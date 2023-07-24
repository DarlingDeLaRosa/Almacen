import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSalidaProductoComponent } from './reporte-salida-producto.component';

describe('ReporteSalidaProductoComponent', () => {
  let component: ReporteSalidaProductoComponent;
  let fixture: ComponentFixture<ReporteSalidaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteSalidaProductoComponent]
    });
    fixture = TestBed.createComponent(ReporteSalidaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
