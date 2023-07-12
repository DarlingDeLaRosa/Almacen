import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoEntradaComponent } from './admin-tipo-entrada.component';

describe('AdminTipoEntradaComponent', () => {
  let component: AdminTipoEntradaComponent;
  let fixture: ComponentFixture<AdminTipoEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTipoEntradaComponent]
    });
    fixture = TestBed.createComponent(AdminTipoEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
