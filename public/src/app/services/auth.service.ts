import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;


  constructor(private http: HttpClient) { }


  registerUser(user) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });

    return this.http.post('http://localhost:3000/users/register', user, {
      headers: headers
    })
    .pipe(map((response: any) => response));
  };
}
