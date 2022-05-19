import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/juegosComp/ahorcado/ahorcado.component';
import { MayormenorComponent } from 'src/app/juegosComp/mayormenor/mayormenor.component';
import { PokemonComponent } from 'src/app/juegosComp/pokemon/pokemon.component';
import { PuntajeComponent } from 'src/app/juegosComp/puntaje/puntaje.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { PreguntadosComponent } from 'src/app/juegosComp/preguntados/preguntados.component';
import { ChatComponent } from 'src/app/juegosComp/chat/chat.component';

@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayormenorComponent,
    PokemonComponent,
    PreguntadosComponent,
    PuntajeComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
})
export class JuegosModule { 

}
