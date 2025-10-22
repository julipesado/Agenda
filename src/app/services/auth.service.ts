
// 
import { inject, Injectable, OnInit } from '@angular/core';
import { LoginData } from '../interfaces/auth';
import { Router } from '@angular/router';
import { NewEditContact } from '../pages/new-edit-contact/new-edit-contact';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  token : null|string = localStorage.getItem("token");
  logged: boolean=false;


    
  async login(loginData: LoginData){
    const res = await fetch("https://agenda-api.somee.com/api/authentication/authenticate",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginData)
      }
    )
    if(res.ok){
      this.token = await res.text()
      localStorage.setItem("token",this.token);
      this.router.navigate(["/"])
    }
  }

  
  logout(){
    this.token = null;
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
  NewEditContact(){
  this.router.navigate(["/"])
}
}
