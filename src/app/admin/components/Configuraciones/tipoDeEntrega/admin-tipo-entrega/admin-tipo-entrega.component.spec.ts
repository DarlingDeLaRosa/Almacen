import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoEntregaComponent } from './admin-tipo-entrega.component';

describe('AdminTipoEntregaComponent', () => {
  let component: AdminTipoEntregaComponent;
  let fixture: ComponentFixture<AdminTipoEntregaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTipoEntregaComponent]
    });
    fixture = TestBed.createComponent(AdminTipoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
