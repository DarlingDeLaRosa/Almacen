import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaModalComponent } from './entrada-modal.component';

describe('EntradaModalComponent', () => {
  let component: EntradaModalComponent;
  let fixture: ComponentFixture<EntradaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaModalComponent]
    });
    fixture = TestBed.createComponent(EntradaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
