import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQrimageComponent } from './modal-qrimage.component';

describe('ModalQrimageComponent', () => {
  let component: ModalQrimageComponent;
  let fixture: ComponentFixture<ModalQrimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQrimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalQrimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
