import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSalidaComponent } from './tipo-salida.component';

describe('TipoSalidaComponent', () => {
  let component: TipoSalidaComponent;
  let fixture: ComponentFixture<TipoSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoSalidaComponent]
    });
    fixture = TestBed.createComponent(TipoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
