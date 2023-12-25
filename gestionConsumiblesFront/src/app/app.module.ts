import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'; // Remove duplicate import


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './login/header/header.component';
import { AuthenticationComponent } from './autenticacion/authentication/authentication.component';
import { FormularioLoginComponent } from './login/formulario-login/formulario-login.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { BotonesComponent } from './login/botones/botones.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { RolesComponent } from './userandRoles/roles/roles.component';
import { UsuariosComponent } from './userandRoles/usuarios/usuarios.component';
import { SidebarModule } from 'ng-sidebar';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
=======
import { GenerarQRComponent } from './generar-qr/generar-qr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272

=======
import { RolesComponent } from './userandRoles/roles/roles.component';
import { UsuariosComponent } from './userandRoles/usuarios/usuarios.component';
import { GenerarQRComponent } from './generar-qr/generar-qr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    FormularioLoginComponent,
    MenuPrincipalComponent,
    BotonesComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    RolesComponent,
    UsuariosComponent,
    SidebarComponent
=======
    GenerarQRComponent,
    
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272
=======
    RolesComponent,
    UsuariosComponent,
    GenerarQRComponent,
    

>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
