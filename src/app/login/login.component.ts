import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public ruteo:Router,private authService: AuthService) {
    
  }

  ngOnInit(): void {
  }

  usuario={
    email:'',
    password: ''
  }

  ingresar()
  {
    const{email,password}=this.usuario;
    this.authService.login(email,password).then(res =>
      {
        console.log("ingreso!: ",res);
      });
    //this.ruteo.navigateByUrl('home');
  }
  ingresarConGoogle(){
    const{email,password}=this.usuario;
    this.authService.loginWithGoogle(email,password).then(res =>
      {
        console.log("se ingreso con google!: ",res);
      });
    //this.ruteo.navigateByUrl('home');
  }

  registrarse()
  {
    const{email,password}=this.usuario;
    this.authService.register(email,password).then(res =>
      {
        console.log("se registro!: ",res);
      });
  }

}
