import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoMedidaComponent } from './admin-tipo-medida.component';

describe('AdminTipoMedidaComponent', () => {
  let component: AdminTipoMedidaComponent;
  let fixture: ComponentFixture<AdminTipoMedidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTipoMedidaComponent]
    });
    fixture = TestBed.createComponent(AdminTipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
