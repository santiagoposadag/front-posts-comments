import { StateService } from './../services/state/state.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, private state:StateService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){
    const response = await this.authService.logInWithGoogle()
    if(response){
      this.state.state.next({
        logedIn: true,
        authenticatedPerson:response})
      this.router.navigateByUrl('/posts')
    }
    console.log(response);  
  }

}
