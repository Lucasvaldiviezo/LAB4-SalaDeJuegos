import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  ahorcado:boolean = false;
  mayorMenor:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  mostrarAhorcado()
  {
    this.ahorcado=true;
    this.mayorMenor=false;
  }

  mostrarMayorMenor()
  {
    this.mayorMenor=true;
    this.ahorcado=false;
  }
}
