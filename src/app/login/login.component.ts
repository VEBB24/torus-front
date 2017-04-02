import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  message: string;
  errorMessage: string;
  constructor(public authService: AuthService, public router: Router, private snackBar: MdSnackBar) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    if (this.username == "" || this.password == "") return false;
    this.message = 'Trying to log in ...';
    this.authService.login(this.username, this.password).subscribe(x => {
      if (x.access_token) {
        this.authService.setSession(x.access_token)
        this.router.navigate(["installation"]);
        this.setMessage();
      } else {
        this.message = x.error_description
        this.snackBar.open(x.error_description, 'Dismiss', { duration: 4000 });
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
