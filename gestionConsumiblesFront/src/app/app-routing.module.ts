import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioLoginComponent } from './login/formulario-login/formulario-login.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { PagenotfoundComponent } from './errores/pagenotfound/pagenotfound.component';
import { RolesComponent } from './userandRoles/roles/roles.component';
import { UsuariosComponent } from './userandRoles/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'roles', component: RolesComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: '**', component:  PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
