import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQrvariosComponent } from './modal-qrvarios.component';

describe('ModalQrvariosComponent', () => {
  let component: ModalQrvariosComponent;
  let fixture: ComponentFixture<ModalQrvariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQrvariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalQrvariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
