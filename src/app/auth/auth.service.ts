import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
  kind: string,
  idToken: string ,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2QU8W9bPNv-vnkX_7YA6gSZOcEfqdhqk', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}

/* Sign up
We need to send a post request to database the reason we created this service, we need to send a object to firebase like the one above returnSecureToken is specific to firebase other API may be diferend,
we need to subscribe to the post request so we need to return the post in order to subscribe in the auth.componenet.ts

We can define a form of the data we get back, we need a new interface that defines how such a object lock like in this case it has 6 proprieties
this is totaly optional but its allwais good to do this, now we can pas this to ower hhtp request this is helpful wen we want to work with this response.
--> auth.component.ts
*/