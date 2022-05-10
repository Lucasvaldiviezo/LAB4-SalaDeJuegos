import { Component, OnInit, Input ,Output,EventEmitter } from '@angular/core';
import { PokemonService } from 'src/app/servicios/pokemonService/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Output() enviarPuntaje:EventEmitter<any>= new EventEmitter<any>();  
  pokemon:any;
  pokemonResp:string = '';
  menu:boolean = true;
  perdio:boolean = false;
  mostrar:boolean = false;
  adivino:boolean = false;
  numero:number = 0;
  puntos:number = 0;
  constructor(public pokemonService:PokemonService) {
    
  }

  ngOnInit(): void {
  }

  comenzar(){
    this.pokemonResp="";
    this.menu = false;
    this.perdio = false;
    this.mostrar = false;
    this.puntos = 0;
    this.elegirPokemon();
  }

  elegirPokemon()
  {
    this.numero = this.getRandomInt(0,150);
    this.pokemonService.getOnePokemon(this.numero).subscribe((resp:any)=>{
      this.pokemon = resp;
    });
  }

  verificarPokemon(){
    if(this.pokemonResp != '')
    {
      if(this.pokemonResp.toLocaleLowerCase() == this.pokemon.name)
      {
        this.mostrar = true;
        this.puntos++;
        this.pokemonResp = "";
        setTimeout(()=>{
          this.mostrar=false;
          this.elegirPokemon();
        }, 800); 
      }else
      {
        this.perdio = true;
        this.mostrar = true;
        this.enviarTablaPuntajes(this.puntos);
      }
    }
  }

  getRandomInt(min:number, max:number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  enviarTablaPuntajes(puntaje:any){
    this.enviarPuntaje.emit(puntaje);
  }
}
