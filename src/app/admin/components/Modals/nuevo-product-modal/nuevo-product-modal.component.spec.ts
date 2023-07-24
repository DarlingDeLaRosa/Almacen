import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductModalComponent } from './nuevo-product-modal.component';

describe('NuevoProductModalComponent', () => {
  let component: NuevoProductModalComponent;
  let fixture: ComponentFixture<NuevoProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoProductModalComponent]
    });
    fixture = TestBed.createComponent(NuevoProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
