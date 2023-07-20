import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorModalComponent } from './proveedor-modal.component';

describe('ProveedorModalComponent', () => {
  let component: ProveedorModalComponent;
  let fixture: ComponentFixture<ProveedorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedorModalComponent]
    });
    fixture = TestBed.createComponent(ProveedorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
