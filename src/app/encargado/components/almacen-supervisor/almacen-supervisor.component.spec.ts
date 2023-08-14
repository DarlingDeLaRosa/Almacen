import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenSupervisorComponent } from './almacen-supervisor.component';

describe('AlmacenSupervisorComponent', () => {
  let component: AlmacenSupervisorComponent;
  let fixture: ComponentFixture<AlmacenSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenSupervisorComponent]
    });
    fixture = TestBed.createComponent(AlmacenSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
