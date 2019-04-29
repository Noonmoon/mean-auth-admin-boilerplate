import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    
    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this._flashMessagesService.show('Please ensure all fields are filled', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    // Validate Email 
    if(!this.validateService.validateEmail(user.email)) {
      this._flashMessagesService.show('Please ensure valid email is submitted', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }
    
    // Register User
    this.authService.registerUser(user).subscribe(response => {
      if(response.success) {
        this._flashMessagesService.show('User registered, thank you', { cssClass: 'alert-success', timeout: 5000 });        
        this.router.navigate(['/login']);
      } else {
        this._flashMessagesService.show('User not registered, try again', { cssClass: 'alert-danger', timeout: 5000 });        
        this.router.navigate(['/register']);
      }
    });

  }
}
