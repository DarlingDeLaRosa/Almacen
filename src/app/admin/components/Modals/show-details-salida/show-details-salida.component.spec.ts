import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsSalidaComponent } from './show-details-salida.component';

describe('ShowDetailsSalidaComponent', () => {
  let component: ShowDetailsSalidaComponent;
  let fixture: ComponentFixture<ShowDetailsSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDetailsSalidaComponent]
    });
    fixture = TestBed.createComponent(ShowDetailsSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
