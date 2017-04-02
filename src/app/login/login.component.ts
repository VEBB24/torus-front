import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  message: string;
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    if (this.username=="" || this.password=="") return false;
    this.message = 'Trying to log in ...';
    this.authService.login(this.username, this.password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
        // Redirect the user
        //this.router.navigate([redirect]);
        this.setMessage();
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }

  ngOnInit() {
  }

}
