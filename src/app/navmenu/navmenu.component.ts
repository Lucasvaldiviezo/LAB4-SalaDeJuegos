import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  
  isLogged:boolean = true;

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout();
  }
}
