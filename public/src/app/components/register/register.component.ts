import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private _flashMessagesService: FlashMessagesService) { }

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
    }

    // Validate Email 
    if(!this.validateService.validateEmail(user.email)) {
      this._flashMessagesService.show('Please ensure valid email is submitted', { cssClass: 'alert-danger', timeout: 5000 });
    }
  }




}
