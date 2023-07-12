import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoAlmacenComponent } from './admin-tipo-almacen.component';

describe('AdminTipoAlmacenComponent', () => {
  let component: AdminTipoAlmacenComponent;
  let fixture: ComponentFixture<AdminTipoAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTipoAlmacenComponent]
    });
    fixture = TestBed.createComponent(AdminTipoAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
