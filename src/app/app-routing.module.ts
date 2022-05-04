import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'sobreMi',component:QuienSoyComponent},
  {path:'juegos', loadChildren: () => import('./modules/juegos/juegos.module').then(m=>m.JuegosModule)},
  {path:'chat', loadChildren: () => import('./modules/chat/chat.module').then(m=>m.ChatModule)},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
