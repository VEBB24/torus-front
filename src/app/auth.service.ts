import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }
  isLoggedIn = false;
  sessionId = "";
  redirectUrl: string;
  login(username, password) {
    let checkLogin = this.http.post("/api/auth", {}).subscribe()
    
// https://torus-45:jyqgjfawTPj5PrTDPEUI@arel.eisti.fr/oauth/token", { "grant_type": "password", "username": "viauthomas", "password": "lalala", "scope": "read", "format": "json" })


    let a = { "access_token": "2db98953-97ae-4d3b-b058-02670282a7a7", "token_type": "bearer", "refresh_token": "756c00aa-782c-4711-8ba0-81b2c95baea7", "expires_in": 601531, "scope": "read" }
    return Observable.of(a).delay(1000).do((val: any) => {
      if (val.error) {
        console.log(val.error_description)
      } else {
        this.isLoggedIn = true
        this.sessionId = "4565dzadazdaz4989"
      }
    })
    /*if (!this.isLoggedIn) {
      this.isLoggedIn = true;
    } else {
      console.error("AuthService#login You are already logged.");
    }
    return this.isLoggedIn;*/
  }

  logout() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
    } else {
      console.error("AuthService#login You are already logged.");
    }
    return this.isLoggedIn;
  }

  isLogged() {
    return this.isLoggedIn;
  }

}
