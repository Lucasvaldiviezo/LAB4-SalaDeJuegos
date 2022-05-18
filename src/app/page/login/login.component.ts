import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { StorageService } from 'src/app/servicios/storageService/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imagen:any;
  archivoSubido:any;
  mostrarImagen:boolean = false;
  imagenDefault:string = "https://ibb.co/w4nr9Vw";
  public formRegistro: FormGroup;
  constructor(public ruteo:Router,public authService: AuthService, private fb: FormBuilder, public fireStore:FirestoreService,public storageService:StorageService) {
      this.formRegistro = this.fb.group({
        'username': ['', [Validators.required, this.spacesValidator]],
        'password': ['', Validators.required],
        'email': ['', [Validators.required, Validators.email]],
        'fechaNacimiento': ['', [Validators.required]],
      });
  }

  ngOnInit(): void {
    
  }
  showError: boolean = false;
  usuario={
    email:'',
    password: ''
  }

  ingresar()
  {
    const{email,password}=this.usuario;
    this.authService.login(email,password)
    .then(
      res =>{
        if(res==null)
        {
          console.log("error al logearse",res);
          this.showError = true;
        }else
        {
          console.log("ingreso!: ",res);
          this.ruteo.navigateByUrl('home');
        } 
      })
    .catch((error:any) =>
      {
          console.log("error al logearse",error);
          this.showError = true;
      });
  }
  
  ingresarConGoogle(){
    const{email,password}=this.usuario;
    this.authService.loginWithGoogle(email,password)
    .then(res =>
    {
      console.log("se ingreso con google!: ",res);
      console.log("se registro!: ",res);
      let usuarioTemp = {
        username: res?.user?.displayName,
        email: res?.user?.email,
        userId: res?.user?.uid,
        fechaCreacion: res?.user?.metadata.creationTime,
        fechaNacimiento: "",
        fotoURL: res?.user?.photoURL,
        };
      this.fireStore.addUsuario("datosUsuarios",usuarioTemp);
      this.ruteo.navigateByUrl('home');
      this.ruteo.navigateByUrl('home');
    })
    .catch((error:any) =>
    {
        console.log("error al logearse con google",error);
        this.showError = true;
    });
  }

  registrarse()
  {
    const username=this.formRegistro.getRawValue().username;
    const email=this.formRegistro.getRawValue().email;
    const password = this.formRegistro.getRawValue().password;
    const fechaNacimiento = this.formRegistro.getRawValue().fechaNacimiento;
    this.authService.register(email,password)
    .then(res =>
    {
      
      console.log("se registro!: ",res);
      let usuarioTemp = {
        username: username,
        email: email,
        userId: res?.user?.uid,
        fechaCreacion: res?.user?.metadata.creationTime,
        fechaNacimiento: fechaNacimiento,
        fotoURL: "https://ibb.co/w4nr9Vw",
        };
      this.fireStore.addUsuario("datosUsuarios",usuarioTemp);
      this.ruteo.navigateByUrl('home');
    })
    .catch((error:any) =>
    {
        console.log("error al registrarse",error);
        this.showError = true;
    });
  }

  obtenerImagen(imagen:any)
  {
    this.archivoSubido = imagen.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.archivoSubido[0]);
    reader.onloadend = () => {
      this.imagen = reader.result;
      this.mostrarImagen = true;
    }
  }
  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null; 
  }

  /*subirImagen(idImagen:string){
    this.storageService.subirImagenStorage(idImagen,this.archivoSubido[0],"fotosPerfil/");
  }*/

}
