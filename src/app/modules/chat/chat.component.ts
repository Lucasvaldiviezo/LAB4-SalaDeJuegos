import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userLogged:any;
  nuevoMensaje:string = '';
  mostrarChat:boolean = false;
  constructor(public authService: AuthService) { }
  mensajes: any=[
  ];
  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(usuario=>{
      this.userLogged = usuario;
    });
  }

  enviarMensaje()
  {
      let mensaje={
        emisor: this.userLogged.uid,
        texto: this.nuevoMensaje,
      }
      if(this.nuevoMensaje != '')
      {
        this.mensajes.push(mensaje);
        this.nuevoMensaje = '';
        setTimeout(() => {
          this.scrollToTheLastElementByClassName();
        }, 10);
      }
  }

  scrollToTheLastElementByClassName(){
    let elements=document.getElementsByClassName('msj');
    let ultimoEle:any = elements[(elements.length - 1)];
    let toppos=ultimoEle.offsetTop;

    //@ts-ignore
    document.getElementById('contenedorDeMensajes')?.scrollTop=toppos;
  }

}
