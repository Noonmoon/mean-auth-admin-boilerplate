import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private validateService:ValidateService,
    private router:Router, 
    private _flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    if(!this.validateService.validateLogin(user)) {
      this._flashMessagesService.show('Please ensure all fields are filled', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(response => {
      console.log(response)
      if(response.success) {
        this.authService.storeUserData(response.token, response.user)
        this._flashMessagesService.show('Now logged in, thank you', { cssClass: 'alert-success', timeout: 5000 });        
        this.router.navigate(['/']);
      } else {
        this._flashMessagesService.show('Login failed', { cssClass: 'alert-danger', timeout: 5000 });        
        this.router.navigate(['/login']);
      }
    }); 
  } 
}
