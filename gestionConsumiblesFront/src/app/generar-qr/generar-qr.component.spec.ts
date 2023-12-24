import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarQRComponent } from './generar-qr.component';

describe('GenerarQRComponent', () => {
  let component: GenerarQRComponent;
  let fixture: ComponentFixture<GenerarQRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarQRComponent]
    });
    fixture = TestBed.createComponent(GenerarQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
