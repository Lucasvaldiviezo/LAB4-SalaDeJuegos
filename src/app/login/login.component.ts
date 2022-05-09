import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formRegistro: FormGroup;
  constructor(public ruteo:Router,public authService: AuthService, private fb: FormBuilder) {
      this.formRegistro = this.fb.group({
        'username': ['', [Validators.required, this.spacesValidator]],
        'password': ['', Validators.required],
        'email': ['', [Validators.required, Validators.email]],
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
    this.authService.login(email,password).then(
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
      });/*.catch((error:any) =>
      {
          console.log("error al logearse",error);
          this.showError = true;
          return Promise.reject(error);
      });*/
  }
  
  ingresarConGoogle(){
    const{email,password}=this.usuario;
    this.authService.loginWithGoogle(email,password).then(res =>
    {
      console.log("se ingreso con google!: ",res);
      this.ruteo.navigateByUrl('home');
    })
    //this.ruteo.navigateByUrl('home');
  }

  registrarse()
  {
    const email=this.formRegistro.getRawValue().email;
    const password = this.formRegistro.getRawValue().password;
    this.authService.register(email,password).then(res =>
      {
        console.log("se registro!: ",res);
        //this.ruteo.navigateByUrl('home');
      });
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null; 
  }

}
