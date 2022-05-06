import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  today:Date;
  userLogged:any;
  nuevoMensaje:string = '';
  mostrarChat:boolean = false;
  constructor(public authService: AuthService, public firestoreService:FirestoreService) {
    this.today = new Date();
    
  }

  mensajes: any=[];
  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(usuario=>{
      this.userLogged = usuario;
    });
    this.firestoreService.getCollection('Chat').subscribe(
      chat=>{
        this.mensajes = chat;
    });
  }

  enviarMensaje()
  {
      this.today = new Date();
      let usuarioTemp:string;
      if(this.userLogged.displayName != null)
      {
        usuarioTemp = this.userLogged.displayName;
      }else
      {
        usuarioTemp = this.userLogged.email;
      }
      let mensaje={
        emisor: this.userLogged.uid,
        usuario: usuarioTemp,
        texto: this.nuevoMensaje,
        hora: this.today.toString(),
      }
      if(this.nuevoMensaje != '')
      {
        this.mensajes.push(mensaje);
        this.nuevoMensaje = '';
        setTimeout(() => {
          this.scrollToTheLastElementByClassName();
        }, 10);
        this.firestoreService.addToChat(mensaje);
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
