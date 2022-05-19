import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';
import { PanelUsuarioComponent } from './page/panel-usuario/panel-usuario.component';
import { EncuestaComponent } from './page/encuesta/encuesta.component';
import { GuardianAutentificadorGuard } from './guard/guardian-autentificador.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'sobreMi',component:QuienSoyComponent},
  {path:'userPanel',component:PanelUsuarioComponent, canActivate:[GuardianAutentificadorGuard]},
  {path:'encuesta',component:EncuestaComponent, canActivate:[GuardianAutentificadorGuard]},
  {path:'juegos',canActivate:[GuardianAutentificadorGuard], loadChildren: () => import('./modules/juegos/juegos.module').then(m=>m.JuegosModule)},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
