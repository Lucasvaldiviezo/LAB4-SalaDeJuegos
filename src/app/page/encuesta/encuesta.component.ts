import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  isUserLogged = this.authService.getUserLogged();
  userLogged:any;
  usuarioActual:any;
  listaUsuarios:any
  public formRegistro: FormGroup;
  opcionesJuegos:string[] = [];
  constructor(private fb: FormBuilder, public fireStoreService:FirestoreService, public authService:AuthService ) { 
    this.isUserLogged.subscribe(usuario=>{
      this.userLogged = usuario;
    });
    this.fireStoreService.getCollection('datosUsuarios').subscribe(
      resp=>{
        this.listaUsuarios = resp;
        this.llenarDatos();
    });
    this.formRegistro = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'numeroTelefono': ['', [Validators.required, Validators.pattern("[1]{2}[0-9]{8}")]],
      'genero': ['', Validators.required],
      'juegos': ['', Validators.required],
      'opinion': ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null; 
  }

  Seleccionado(isChecked:any){
    if(isChecked.target.checked) {
      this.opcionesJuegos.push(isChecked.target.value);
    } else {
      let index = this.opcionesJuegos.findIndex(x => x == isChecked.target.value)
      this.opcionesJuegos.splice(index);
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

  enviarEncuentas()
  {
    let juegosElegidos = "";
    for(let juego of this.opcionesJuegos)
    {
      juegosElegidos = juegosElegidos + "+" + juego;
    }
    const nombre=this.formRegistro.getRawValue().nombre;
    const apellido=this.formRegistro.getRawValue().apellido;
    const edad = this.formRegistro.getRawValue().edad;
    const numeroTelefono = this.formRegistro.getRawValue().numeroTelefono;
    const genero = this.formRegistro.getRawValue().genero;
    const juegos = this.formRegistro.getRawValue().juegos;
    const opinion = this.formRegistro.getRawValue().opinion;
    let encuesta = {
      usuario: this.usuarioActual.username,
      email: this.usuarioActual.email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      numeroTelefono: numeroTelefono,
      genero: genero,
      juegos: juegosElegidos,
      opinion: opinion,
      };
    this.fireStoreService.addUsuario("encuestas",encuesta);
    if(this.formRegistro.valid){
      this.formRegistro.controls['numeroTelefono'].setValue("");
      this.formRegistro.controls['nombre'].setValue("");
      this.formRegistro.controls['apellido'].setValue("");
      this.formRegistro.controls['edad'].setValue("");
      this.formRegistro.controls['opinion'].setValue("");
    }
  }
}
