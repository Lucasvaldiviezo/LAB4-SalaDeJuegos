import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/juegosComp/ahorcado/ahorcado.component';
import { MayormenorComponent } from 'src/app/juegosComp/mayormenor/mayormenor.component';


@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayormenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,  
  ]
})
export class JuegosModule { }
