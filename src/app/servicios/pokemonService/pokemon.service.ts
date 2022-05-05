import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  _url = "https://pokeapi.co/api/v2/pokemon/";
  constructor(public http:HttpClient) { }

  getAllPokemon(){
    let header = new HttpHeaders().set('Type-Content','aplication/json');
    return this.http.get(this._url,{
      headers:header,
    });
  }

  getOnePokemon(pokemon:number)
  {
    let header = new HttpHeaders().set('Type-Content','aplication/json');
    return this.http.get(this._url+pokemon,{
      headers:header,
    });
  }

}
