import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service'; 

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  @Output() juegoActual:EventEmitter<any>= new EventEmitter<any>();
  juego:string = "";  
  ahorcado:boolean = false;
  mayorMenor:boolean = false;
  pokemon:boolean = false;
  puntajeRecibido:any;
  userLogged = this.authService.getUserLogged();

  constructor(public authService: AuthService) { 
    this.puntajeRecibido = 0;
  }

  ngOnInit(): void {
  }
  mostrarAhorcado()
  {
    this.ahorcado=true;
    this.mayorMenor=false;
    this.pokemon=false;
    this.juego = "ahorcado";
    this.juegoActual.emit(this.juego);
  }

  mostrarMayorMenor()
  {
    this.mayorMenor=true;
    this.ahorcado=false;
    this.pokemon=false;
    this.juego = "mayorMenor";
    this.juegoActual.emit(this.juego);
  }

  mostrarPokemon()
  {
    this.mayorMenor=false;
    this.ahorcado=false;
    this.pokemon=true;
    this.juego = "pokemon";
    this.juegoActual.emit(this.juego);
  }

  tomarPuntajeParaTabla(nuevoPuntaje: any)
  {
    this.puntajeRecibido=nuevoPuntaje;
  }
}
