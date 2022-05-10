import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/juegosComp/ahorcado/ahorcado.component';
import { MayormenorComponent } from 'src/app/juegosComp/mayormenor/mayormenor.component';
import { PokemonComponent } from 'src/app/juegosComp/pokemon/pokemon.component';
import { PuntajeComponent } from 'src/app/juegosComp/puntaje/puntaje.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayormenorComponent,
    PokemonComponent,
    PuntajeComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
  ]
})
export class JuegosModule { 

  ahorcado = false;
}
