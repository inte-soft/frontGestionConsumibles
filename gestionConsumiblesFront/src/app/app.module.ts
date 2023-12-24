import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './login/header/header.component';
import { AuthenticationComponent } from './autenticacion/authentication/authentication.component';
import { ContenidoComponent } from './login/contenido/contenido.component';
import { FormularioLoginComponent } from './login/formulario-login/formulario-login.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { BotonesComponent } from './login/botones/botones.component';
<<<<<<< HEAD
import { RolesComponent } from './userandRoles/roles/roles.component';
import { UsuariosComponent } from './userandRoles/usuarios/usuarios.component';
=======
import { GenerarQRComponent } from './generar-qr/generar-qr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    ContenidoComponent,
    FormularioLoginComponent,
    MenuPrincipalComponent,
    BotonesComponent,
<<<<<<< HEAD
    RolesComponent,
    UsuariosComponent
=======
    GenerarQRComponent,
    
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
    NgbModule,
    NgbModalModule
=======
    BrowserAnimationsModule,
    
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272
  ],
  providers: [],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
