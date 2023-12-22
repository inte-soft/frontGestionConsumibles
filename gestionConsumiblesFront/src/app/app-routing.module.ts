import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarQRComponent } from './generar-qr/generar-qr.component';



//Renderizamos los componentes, para configurar las rutas
//con el fin de movernos entre los componentes
const routes: Routes = [
  { path: '', redirectTo: 'generar-qr', pathMatch: 'full'},
  { path: 'generar-qr', component: GenerarQRComponent},
  { path: '**', redirectTo: 'generar-qr', pathMatch: 'full'},//builder, siempre al final para evitar errores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

