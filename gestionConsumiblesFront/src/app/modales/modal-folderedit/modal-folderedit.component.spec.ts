import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFoldereditComponent } from './modal-folderedit.component';

describe('ModalFoldereditComponent', () => {
  let component: ModalFoldereditComponent;
  let fixture: ComponentFixture<ModalFoldereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFoldereditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFoldereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
