import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }
  isLoggedIn = false;
  username = ""
  sessionId = ""
  login(username, password) {
    localStorage.setItem("username", username)
    this.username = username
    return this.http.post("/api/auth", { "username": username, "password": password }).map((x: Response) => x.json())
  }

  public setSession(access_token) {
    let valid_token = this.checkToken(access_token)
    if (valid_token) {
      this.isLoggedIn = true
      this.sessionId = access_token
      localStorage.setItem("access_token", access_token)
      console.debug("AuthService#setSession You are logged in.")
    } else {
      console.error("AuthService#setSession Invalid access_token.")
      localStorage.setItem("access_token", "")
    }
  }

  checkSession() : boolean {
    let access_token = localStorage.getItem("access_token")
    if (access_token != null && access_token != "") {
      this.setSession(access_token)
      return true
    } else return false
  }

  private checkToken(access_token) : boolean {
    return true
  }

  logout() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false
      this.sessionId = ""
      localStorage.setItem("access_token", "")
      localStorage.setItem("username", "")
      console.debug("AuthService#logout You are logged out.")
    } else console.error("AuthService#logout You are already logged out.")
    return this.isLoggedIn
  }

  isLogged() {
    return this.isLoggedIn
  }

}
