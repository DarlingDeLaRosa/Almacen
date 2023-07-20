import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeProductoModalComponent } from './tipo-de-producto-modal.component';

describe('TipoDeProductoModalComponent', () => {
  let component: TipoDeProductoModalComponent;
  let fixture: ComponentFixture<TipoDeProductoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeProductoModalComponent]
    });
    fixture = TestBed.createComponent(TipoDeProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
