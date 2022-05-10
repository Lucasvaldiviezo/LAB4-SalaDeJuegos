import { Component, OnInit, Input ,Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service'; 
import { FirestoreService } from 'src/app/servicios/firestore.service';
@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  userLogged:any;
  @Input() juegoActual:string ="pokemon";
  @Input() puntajeRecibido:any;
  tablaPuntajes:any;
  coleccionActual:any;
  topMax:number = 5;
  constructor(public authService: AuthService,public firestoreService:FirestoreService) { 
    this.tablaPuntajes = [];
    this.authService.getUserLogged().subscribe(usuario=>{
      this.userLogged = usuario;
    });
    this.elegirColeccion();
  }

  ngOnInit(): void {
  }

  actualizarLista(){
    let agregado = 0;
    if(this.puntajeRecibido > 0)
    {
      let nuevoPuntaje;
      if(this.tablaPuntajes.length > 0)
      {
        for(let i = 0; i < this.tablaPuntajes.length; i++){
          if(this.compararPuntaje(this.puntajeRecibido,this.tablaPuntajes[i].puntaje,) == 1)
          {
            nuevoPuntaje = {posicion: i+1,puntaje: this.puntajeRecibido, usuario: this.userLogged.email};
            for(let j = 0 ; j< this.tablaPuntajes.length;j++){
              this.tablaPuntajes[j].posicion++;
            }
            this.tablaPuntajes.splice(i,0,nuevoPuntaje);
            agregado = 1;
            break;
          }
          if(this.tablaPuntajes.length < this.topMax && agregado == 0)
          {
            nuevoPuntaje = {posicion: i+2,puntaje: this.puntajeRecibido, usuario: this.userLogged.email};
            this.tablaPuntajes.push(nuevoPuntaje);
            break;
          }
        }
        
      }else
      {
        nuevoPuntaje = {posicion:1,puntaje: this.puntajeRecibido, usuario: this.userLogged.email};
        this.tablaPuntajes.push(nuevoPuntaje);
      }
      this.firestoreService.addScore(this.coleccionActual,nuevoPuntaje);
    }
  }

  ordenarArray(array:any){
    
  }
  //Si el item1 es menor que el item2 devuelve -1.
  //Si el item1 es mayor que el item2 devuelve 1
  //Si son iguales devuelve 0
  compararPuntaje( item1:any, item2:any ) {
    let retorno:number;
    if ( item1 < item2 ){
      retorno = -1;
    }else if( item1 > item2 ){
      retorno = 1;
    }else
    {
      retorno = 0;
    }
    return retorno;
  }

  elegirColeccion(){
    switch(this.juegoActual){
      case "pokemon":
        this.coleccionActual = "PuntajePokemon";
        this.firestoreService.getCollection(this.coleccionActual).subscribe(
          puntajes=>{
            this.tablaPuntajes = puntajes;
        });
        this.coleccionActual = "PuntajePokemon"
      break;
      case "ahorcado":
        this.coleccionActual = "PuntajeAhorcado"
        this.firestoreService.getCollection(this.coleccionActual).subscribe(
          puntajes=>{
            this.tablaPuntajes = puntajes;
        });
      break;
    }
  }
}
