import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  juego:string = "";  
  ahorcado:boolean = false;
  mayorMenor:boolean = false;
  pokemon:boolean = false;
  preguntados:boolean = false;
  puntajeRecibido:any;
  

  constructor() { 
    this.puntajeRecibido = 0;
  }

  ngOnInit(): void {
  }
  mostrarAhorcado()
  {
    this.ahorcado=true;
    this.mayorMenor=false;
    this.pokemon=false;
    this.preguntados=false;
    this.juego = "ahorcado";
  }

  mostrarMayorMenor()
  {
    this.mayorMenor=true;
    this.ahorcado=false;
    this.pokemon=false;
    this.preguntados=false;
    this.juego = "mayorMenor";
  }

  mostrarPokemon()
  {
    this.mayorMenor=false;
    this.ahorcado=false;
    this.pokemon=true;
    this.preguntados=false;
    this.juego = "pokemon";
  }

  mostrarPreguntados()
  {
    this.mayorMenor=false;
    this.ahorcado=false;
    this.pokemon=false;
    this.preguntados=true;
    this.juego = "preguntados";
  }

  tomarPuntajeParaTabla(nuevoPuntaje: any)
  {
    this.puntajeRecibido=nuevoPuntaje;
  }
}
