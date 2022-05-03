import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {
  menu:boolean = true;
  tipoCarta:number = 0;
  palo:string = '';
  cartaActual:number =0;
  proximaCarta:number = 0;
  cartaAnterior:number = 1;
  paloAnterior:string = 'spades';
  ocultar:boolean = true;
  puntos:number = 0;
  constructor() { }
  ngOnInit(): void {
  }
  elegirCarta()
  {
    this.menu = false;
    this.cartaActual=this.getRandomInt(1,13);
    this.tipoCarta = this.getRandomInt(1,4);
    this.proximaCarta = this.getRandomInt(1,13);
    while(this.proximaCarta == this.cartaActual)
    {
      this.proximaCarta = this.getRandomInt(1,13);
    }
    this.elegirPalo();
  }
  elegirPalo()
  {
    switch(this.tipoCarta)
    {
      case 1:
        this.palo = 'hearts';
        break;
      case 2:
        this.palo = 'spades';
        break;
      case 3:
        this.palo = 'clubs';
        break;
      case 4:
        this.palo = 'diamonds';
        break;
    }
  }
  adivinarProximaCarta(opcion:string)
  {
    if(opcion == 'mayor')
    {
      if(this.cartaActual < this.proximaCarta || this.proximaCarta==1){
        this.puntos++;
      }else
      {
        console.log(this.cartaActual +" no es mayor que " + this.proximaCarta);
      }
    }else
    {
      if(this.cartaActual > this.proximaCarta || this.cartaActual==1){
        this.puntos++;
      }else
      {
        console.log(this.cartaActual +" no es menor que " + this.proximaCarta);
      }
    }

    this.ocultar=false;
    setTimeout(()=>{
        this.elegirProximaCarta();
        this.ocultar=true;
    }, 800);
  }

  elegirProximaCarta()
  {
    this.cartaAnterior = this.cartaActual;
    this.paloAnterior = this.palo;
    this.cartaActual=this.proximaCarta;
    this.tipoCarta = this.getRandomInt(1,4);
    this.proximaCarta = this.getRandomInt(1,13);
    while(this.proximaCarta==this.cartaActual)
    {
      this.proximaCarta = this.getRandomInt(1,13);
    }
    this.elegirPalo();
  }

  getRandomInt(min:number, max:number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
}
