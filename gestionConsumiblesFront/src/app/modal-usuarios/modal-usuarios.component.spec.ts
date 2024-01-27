import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { ModalUsuariosComponent } from './modal-usuarios.component';

describe('ModalRolesComponent', () => {
  let component: ModalUsuariosComponent
=======
import { ModalUsuariosComponent } from './modal-usuarios.component';

describe('ModalUsuariosComponent', () => {
  let component: ModalUsuariosComponent;
>>>>>>> 355a03692ec1fb07f9379c8a63a3e92d667e3cd1
  let fixture: ComponentFixture<ModalUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
