import { RequestsService } from './../services/requests/requests.service';
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

  constructor(private authService:AuthService, private router:Router, private state:StateService, private request:RequestsService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){
    const response = await this.authService.logInWithGoogle()

    if(response){

      this.state.state.next({
        logedIn: true,
        authenticatedPerson: response,
        token: ''
      })

      this.request.loginMethod({
        username: response.user.email,
        password: response.user.email
      }).subscribe({
        next: token => {
          if(token){
            this.state.state.next({
              logedIn: true,
              authenticatedPerson:response,
              token: token.token
            })
          }
          this.router.navigateByUrl('/posts')
        }
      })
      
      
    }
    console.log(response);  
  }

}
