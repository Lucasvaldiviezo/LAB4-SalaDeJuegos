import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PokemonService } from 'src/app/servicios/pokemonService/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon:any;
  pokemonResp:string = '';
  menu:boolean = true;
  gano:boolean = false;
  perdio:boolean = false;
  numero:number = 0;
  constructor(public pokemonService:PokemonService) {
    
  }

  ngOnInit(): void {
  }

  elegirPokemon()
  {
    this.menu = false;
    this.gano = false;
    this.perdio = false;
    this.numero = this.getRandomInt(0,150);
    this.pokemonService.getOnePokemon(this.numero).subscribe((resp:any)=>{
      this.pokemon = resp;
    });
  }

  verificarPokemon(){
    if(this.pokemonResp.toLocaleLowerCase() == this.pokemon.name)
    {
      console.log("GANO!");
    }else
    {
      console.log("PERDIO :(");
    }
  }

  getRandomInt(min:number, max:number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
}
