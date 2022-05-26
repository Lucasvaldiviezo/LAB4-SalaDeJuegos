import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/authService/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class GuardianAutentificadorGuard implements CanActivate {
  constructor(public authService: AuthService, public ruteo:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserLogged == true) {
        return true;
    }
    this.ruteo.navigate(["/login"],{replaceUrl:true});
    return false; 
    
  }
  
}
