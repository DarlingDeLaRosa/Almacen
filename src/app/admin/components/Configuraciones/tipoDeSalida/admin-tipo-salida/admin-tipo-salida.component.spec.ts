import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoSalidaComponent } from './admin-tipo-salida.component';

describe('AdminTipoSalidaComponent', () => {
  let component: AdminTipoSalidaComponent;
  let fixture: ComponentFixture<AdminTipoSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTipoSalidaComponent]
    });
    fixture = TestBed.createComponent(AdminTipoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
