import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { StorageService } from 'src/app/servicios/storageService/storage.service';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {
  userLogged:any;
  usuarioActual:any
  listaUsuarios:any;
  archivoSubido:any;
  fotoActual:any;
  imagen:any;
  constructor(public authService:AuthService,public fireStoreService:FirestoreService, public storageService:StorageService) { 
    this.authService.getUserLogged().subscribe(usuario=>{
      this.userLogged = usuario;
    });
    this.fireStoreService.getCollection('datosUsuarios').subscribe(
      resp=>{
        this.listaUsuarios = resp;
        this.llenarDatos();
    });
  }

  ngOnInit(): void {
    
  }
  llenarDatos()
  {
    for(let i=0;i < this.listaUsuarios.length;i++)
    {
      if(this.userLogged.email == this.listaUsuarios[i].email)
      {
        let fecha:Date = new Date(this.listaUsuarios[i].fechaCreacion);
        this.usuarioActual = this.listaUsuarios[i];
        this.fotoActual = this.listaUsuarios[i].fotoURL;
        this.usuarioActual.fechaCreacion = fecha;
        break;
      }
    }
  }

  obtenerImagen(imagen:any)
  {
    this.archivoSubido = imagen.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.archivoSubido[0]);
    reader.onloadend = () => {
      this.imagen = reader.result;
      this.fotoActual = this.imagen;
    }
  }

  cambiarFotoPerfil(idImagen:string){
    this.storageService.subirImagenStorage(idImagen,this.archivoSubido[0],"fotosDePerfil/");
  }

  guardarDatos(){
    if(this.fotoActual != this.usuarioActual.fotoURL)
    { 
      console.log("ENTRE");
      this.cambiarFotoPerfil(this.usuarioActual.username+this.usuarioActual.email);
    }
  }

}
