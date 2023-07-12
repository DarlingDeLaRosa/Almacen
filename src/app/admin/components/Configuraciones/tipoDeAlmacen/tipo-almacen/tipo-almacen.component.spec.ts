import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAlmacenComponent } from './tipo-almacen.component';

describe('TipoAlmacenComponent', () => {
  let component: TipoAlmacenComponent;
  let fixture: ComponentFixture<TipoAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoAlmacenComponent]
    });
    fixture = TestBed.createComponent(TipoAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
