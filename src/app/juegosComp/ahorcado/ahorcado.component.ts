import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  @Output() enviarPuntaje:EventEmitter<any>= new EventEmitter<any>();  
  todasLasPalabras: string[] = ['AGUACATE','MANZANA','NARANJA','CASA','MATERIAS','ESCUELA','ESPAÑOL','CASCO','OLAS','FAROLA','FOCO','ZANAHORIA','MAMUT','CAFE','PEGAR','LAPICERA',
  'IMAN','COSAS','PROGRAMACION','ARBOL','PANTALON','BIENVENIDO','VOLVER','YAGUARETE'];
  palabra = '';
  palabraOculta = '';
  intentos = 0;
  gano = false;
  perdio = false;
  menu = true;
  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  numPalabra:number = 0;
  puntos:number = -1;
  constructor() {
  }

  ngOnInit(): void {
  }

  elegirPalabra()
  {
    this.numPalabra = this.getRandomInt(0,this.todasLasPalabras.length-1);
    this.palabraOculta = '_ '.repeat(this.todasLasPalabras[this.numPalabra].length);
    this.palabra = this.todasLasPalabras[this.numPalabra];
    this.menu = false;
    this.gano = false;
    this.perdio = false;
    this.intentos = 0;
    this.puntos++;
  }

  getRandomInt(min:number, max:number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  comprobar( letra:string ) {

    this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');

    for (let i = 0; i < this.palabra.length; i++) {
      if ( this.palabra[i] === letra ) {
        palabraOcultaArr[i] = letra;
      }

      this.palabraOculta = palabraOcultaArr.join(' ');
      this.verificaGane();
    }
  }

  verificaGane() {
    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');
    if ( palabraEvaluar === this.palabra ) {
      this.gano = true;
    }
    if ( this.intentos >= 9 ){
      this.perdio = true;
      this.puntos = 0;
    }
  }

  volverAMenu()
  {
    this.menu = true;
    this.perdio = false;
    this.puntos = 0;
    this.enviarTablaPuntajes(this.puntos);
  }

  existeLetra( letra:string ) {
    if ( this.palabra.indexOf( letra ) >= 0) {
      console.log('La letra ' + letra + ' existe');
    } else {
      console.log('La letra ' + letra + ' no existe');
      this.intentos++;
    }
  }

  enviarTablaPuntajes(puntaje:any){
    this.enviarPuntaje.emit(puntaje);
  }
  
}
