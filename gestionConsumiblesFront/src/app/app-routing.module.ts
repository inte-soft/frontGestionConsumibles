import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c
import { FormularioLoginComponent } from './login/formulario-login/formulario-login.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { PagenotfoundComponent } from './errores/pagenotfound/pagenotfound.component';
import { RolesComponent } from './userandRoles/roles/roles.component';
<<<<<<< HEAD
import { UsuariosComponent } from './userandRoles/usuarios/usuarios.component';
=======
=======
>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c
import { GenerarQRComponent } from './generar-qr/generar-qr.component';
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272



//Renderizamos los componentes, para configurar las rutas
//con el fin de movernos entre los componentes
const routes: Routes = [
<<<<<<< HEAD
<<<<<<< HEAD
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'roles', component: RolesComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: '**', component:  PagenotfoundComponent},
=======
  { path: '', redirectTo: 'generar-qr', pathMatch: 'full'},
  { path: 'generar-qr', component: GenerarQRComponent},
  { path: '**', redirectTo: 'generar-qr', pathMatch: 'full'},//builder, siempre al final para evitar errores
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272
=======
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'roles', component: RolesComponent},
  { path: 'generar-qr', component: GenerarQRComponent},
  { path: '**', component:  PagenotfoundComponent},
>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

