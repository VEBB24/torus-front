import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;

    return this.checkLogin(url);

    /*console.debug('AuthGuardService#canActivate called');
    this.isLogged = this.auth.isLogged();
    if (this.isLogged) return this.isLogged;
    else {
      console.debug('AuthGuardService#canActivate tries to log');
      this.isLogged = this.auth.login();
      return this.isLogged;
    }*/
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}