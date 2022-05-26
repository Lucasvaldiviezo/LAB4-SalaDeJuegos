import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/authService/auth.service'; 
import { FirestoreService } from 'src/app/servicios/firestoreService/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  today:Date;
  listaUsuarios:any;
  usuarioActual:any;
  userLogged:any;
  nuevoMensaje:string = '';
  mostrarChat:boolean = false;
  profileIsVisible:boolean=false;
  usuarioPopUp:any;
  constructor(public authService: AuthService, public fireStoreService:FirestoreService) {
    this.today = new Date();
  }

  mensajes: any=[];
  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(usuario=>{
      this.userLogged = usuario;
    });
    this.fireStoreService.getCollectionWithId('Chat',"chatId").subscribe(
      chat=>{
        this.mensajes = chat;
        this.mensajes.sort(function(elemento1:any,elemento2:any){
          return elemento1.id - elemento2.id;
        });
      this.fireStoreService.getCollectionWithId('datosUsuarios',"usuarioId").subscribe(
        resp=>{
          this.listaUsuarios = resp;
          this.buscarUsuarioPorMail();
      });
    });
  }

  enviarMensaje()
  {
      this.today = new Date();
      console.log(this.usuarioActual);
      let mensaje={
        emisor: this.userLogged.uid,
        usuario: this.usuarioActual.username,
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
        this.fireStoreService.addToChat(mensaje,this.mensajes.length);
      }
  }

  buscarUsuarioPorMail(){
    for(let i=0;i<this.listaUsuarios.length;i++)
    {
      if(this.userLogged.email == this.listaUsuarios[i].email)
      {
        this.usuarioActual = this.listaUsuarios[i];
        break;
      }
    }
  }
  buscarUsuario(usuarioABuscar:any){
    for(let i=0;i<this.listaUsuarios.length;i++)
    {
      if(usuarioABuscar == this.listaUsuarios[i].username)
      {
        this.usuarioPopUp = this.listaUsuarios[i];
        break;
      }
    }
  }

  mostrarPerfil(mensaje:any)
  {
    this.profileIsVisible=true;
    this.buscarUsuario(mensaje.usuario);
  }
  esconderPefil(mensaje:any)
  {
    this.profileIsVisible = false;
  }

  scrollToTheLastElementByClassName(){
    let elements=document.getElementsByClassName('msj');
    let ultimoEle:any = elements[(elements.length - 1)];
    let toppos=ultimoEle.offsetTop;

    //@ts-ignore
    document.getElementById('contenedorDeMensajes')?.scrollTop=toppos;
  }

}
