import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoProductoComponent } from './admin-tipo-producto.component';

describe('AdminTipoProductoComponent', () => {
  let component: AdminTipoProductoComponent;
  let fixture: ComponentFixture<AdminTipoProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTipoProductoComponent]
    });
    fixture = TestBed.createComponent(AdminTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
