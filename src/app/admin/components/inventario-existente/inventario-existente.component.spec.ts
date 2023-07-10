import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioExistenteComponent } from './inventario-existente.component';

describe('InventarioExistenteComponent', () => {
  let component: InventarioExistenteComponent;
  let fixture: ComponentFixture<InventarioExistenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioExistenteComponent]
    });
    fixture = TestBed.createComponent(InventarioExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
