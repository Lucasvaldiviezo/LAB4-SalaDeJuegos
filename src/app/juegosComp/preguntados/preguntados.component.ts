import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { PaisesService } from 'src/app/servicios/paisesServicios/paises.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  @Output() enviarPuntaje:EventEmitter<any>= new EventEmitter<any>();  
  puntos:number = 0;
  perdio:boolean = false;
  adivino:boolean = false;
  menu:boolean = true;
  cargando:boolean=true;
  listaPaises:any;
  paisCorrecto:any;
  paisesRespuesta:any;
  respuesta1:string; 
  respuesta2:string;
  respuesta3:string;
  respuesta4:string;

  constructor(public paisesServicio:PaisesService) {
      this.listaPaises = [];
      this.paisesRespuesta = [];
      this.respuesta1 ='';
      this.respuesta2 ='';
      this.respuesta3 ='';
      this.respuesta4 ='';
  }

  comenzar(){
    this.menu = false;
    this.perdio = false;
    this.puntos = 0;
    this.elegirPais();
  }

  ngOnInit(): void {
    this.paisesServicio.getAllCountries().subscribe((resp:any)=>{
      this.listaPaises = resp;
      this.cargando=false;
    });
  }

  elegirPais()
  {
    let id:number;
    for(let i=0; i < 4; i++)
    {
      id = this.getRandomInt(0,250);
      this.paisesRespuesta[i] = this.listaPaises[id];
    }
    this.guardarRespuestas(this.paisesRespuesta);
    id = this.getRandomInt(0,3);
    this.paisCorrecto = this.paisesRespuesta[id];
  }

  verificarRespuesta(pais:string)
  {
    if(this.paisCorrecto.name.common == pais)
    {
      this.puntos++;
      this.elegirPais();
    }else
    {
      this.perdio=true;
    }
  }

  volverAMenu()
  {
    this.menu = true;
    this.perdio = false;
    this.puntos = 0;
    this.enviarTablaPuntajes(this.puntos);
  }

  getRandomInt(min:number, max:number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  guardarRespuestas(paisesRespuesta:any)
  {
    console.log(paisesRespuesta);
    this.respuesta1 = paisesRespuesta[0].name.common;
    this.respuesta2 = paisesRespuesta[1].name.common;
    this.respuesta3 = paisesRespuesta[2].name.common;
    this.respuesta4 = paisesRespuesta[3].name.common;
    
  }

  enviarTablaPuntajes(puntaje:any){
    this.enviarPuntaje.emit(puntaje);
  }

  

}
