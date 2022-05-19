import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  isUserLogged = this.authService.getUserLogged();
  userLogged:any = "";
  usuarioActual:any
  listaUsuarios:any;
  isLogged:boolean = true;

  constructor(public authService: AuthService, public fireStoreService:FirestoreService) {
    this.usuarioActual = {
      username: "",
      fotoURL: "",
      email: "",
    }
    this.isUserLogged.subscribe(usuario=>{
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
    if(this.userLogged != null)
    {
      this.authService.isUserLogged = true;
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

  logout()
  {
    this.authService.logout();
    this.usuarioActual = {
      username: "",
      fotoURL: "",
      email: "",
    }
  }
}
