import { DatePipe } from '@angular/common';
import { Component, OnInit, Input ,Output,EventEmitter, SimpleChange } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service'; 
import { FirestoreService } from 'src/app/servicios/firestore.service';
@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  userLogged:any;
  usuarioActual:any
  listaUsuarios:any
  @Input() juegoActual:string = '';
  @Input() puntajeRecibido:any;
  tablaPuntajes:any;
  coleccionActual:any;
  topMax:number = 5;
  constructor(public authService: AuthService,public fireStoreService:FirestoreService, public datePipe:DatePipe) { 
    this.tablaPuntajes = [];
    this.authService.getUserLogged().subscribe(usuario=>{
      this.userLogged = usuario;
    });
    this.fireStoreService.getCollection('datosUsuarios').subscribe(
      resp=>{
        this.listaUsuarios = resp;
        this.llenarDatos();
    });
    this.elegirColeccion();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChange)
  {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'juegoActual': {
            this.elegirColeccion();
          }
          break;
          case 'puntajeRecibido':{
            this.actualizarLista();
          }
        }
      }
    }
  }

  actualizarLista(){
    if(this.puntajeRecibido > 0)
    {
      let agregado = 0;
      let nuevoPuntaje;
      let fechaActual = new Date();
      let fechaString = this.datePipe.transform(fechaActual, 'yyyy-MM-dd');;
      if(this.tablaPuntajes.length > 0)
      {
        for(let i = 0; i< this.tablaPuntajes.length;i++)
        {
            if(this.puntajeRecibido > this.tablaPuntajes[i].puntaje)
            {
              nuevoPuntaje = {posicion: i+1,puntaje: this.puntajeRecibido, usuario: this.usuarioActual.username,fecha: fechaString};
              for(let j = 0 ; j< this.tablaPuntajes.length;j++){
                this.tablaPuntajes[j].posicion++;
              }
              this.tablaPuntajes.splice(i,0,nuevoPuntaje);
              if(this.tablaPuntajes.length > this.topMax)
              {
                this.tablaPuntajes.splice(-1)
              }
              agregado = 1;
              this.fireStoreService.actualizarColeccionCompleta(this.coleccionActual,this.tablaPuntajes);
              break;
            }else if(this.puntajeRecibido == this.tablaPuntajes[i].puntaje)
            {
              nuevoPuntaje = {posicion: i+1,puntaje: this.puntajeRecibido, usuario: this.usuarioActual.username, fecha: fechaString};
              this.tablaPuntajes.splice(i,1,nuevoPuntaje);
              this.fireStoreService.actualizarColeccionCompleta(this.coleccionActual,this.tablaPuntajes);
              agregado = 1;
              break;
            }
        }
        if(this.tablaPuntajes.length < this.topMax && agregado == 0)
        {
          nuevoPuntaje = {posicion: this.tablaPuntajes.length+1,puntaje: this.puntajeRecibido, usuario: this.usuarioActual.username,fecha: fechaString};
          this.tablaPuntajes.push(nuevoPuntaje);
          this.fireStoreService.addScore(this.coleccionActual,nuevoPuntaje);
        }
      }else
      {
        nuevoPuntaje = {posicion:1,puntaje: this.puntajeRecibido, usuario: this.usuarioActual.username,fecha: fechaString};
        this.tablaPuntajes.push(nuevoPuntaje);
        this.fireStoreService.addScore(this.coleccionActual,nuevoPuntaje);
      }
    }
  }

  llenarDatos()
  {
    if(this.userLogged != null)
    {
      for(let i=0;i < this.listaUsuarios.length;i++)
      {
        if(this.userLogged.email == this.listaUsuarios[i].email)
        {
          let fecha:Date = new Date(this.listaUsuarios[i].fechaCreacion);
          this.usuarioActual = this.listaUsuarios[i];
          this.usuarioActual.fechaCreacion = fecha;
          break;
        }
      }
    } 
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
    this.tablaPuntajes = [];
    console.log(this.tablaPuntajes);
    switch(this.juegoActual){
      case "pokemon":
        this.coleccionActual = "PuntajePokemon";
        this.fireStoreService.getCollection(this.coleccionActual).subscribe(
          puntajes=>{
            this.tablaPuntajes = puntajes;
        });
      break;
      case "ahorcado":
        this.coleccionActual = "PuntajeAhorcado"
        this.fireStoreService.getCollection(this.coleccionActual).subscribe(
          puntajes=>{
            this.tablaPuntajes = puntajes;
        });
      break;
      case "mayorMenor":
        this.coleccionActual = "PuntajeMayorMenor"
        this.fireStoreService.getCollection(this.coleccionActual).subscribe(
          puntajes=>{
            this.tablaPuntajes = puntajes;
        });
        break;
      case "preguntados":
        this.coleccionActual = "PuntajePreguntados"
        this.fireStoreService.getCollection(this.coleccionActual).subscribe(
          puntajes=>{
            this.tablaPuntajes = puntajes;
        });
      break;
    }
  }
}
