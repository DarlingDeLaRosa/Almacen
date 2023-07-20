import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeAlmacenModalComponent } from './tipo-de-almacen-modal.component';

describe('TipoDeAlmacenModalComponent', () => {
  let component: TipoDeAlmacenModalComponent;
  let fixture: ComponentFixture<TipoDeAlmacenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeAlmacenModalComponent]
    });
    fixture = TestBed.createComponent(TipoDeAlmacenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
