import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioLoginComponent } from './login/formulario-login/formulario-login.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { PagenotfoundComponent } from './errores/pagenotfound/pagenotfound.component';
import { RolesComponent } from './userandRoles/roles/roles.component';
import { GenerarQRComponent } from './generar-qr/generar-qr.component';



//Renderizamos los componentes, para configurar las rutas
//con el fin de movernos entre los componentes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'roles', component: RolesComponent},
  { path: 'generar-qr', component: GenerarQRComponent},
  { path: '**', component:  PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

