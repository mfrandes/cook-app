import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData{
  kind: string,
  idToken: string ,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean /* to be able to use it for bouth singn up and logg in the ? informs this is optional*/
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
    }).pipe(catchError( errorRes => {
      let errorMessage = 'An unknown error accurred!';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already in use!'
      }
      return throwError(errorMessage);
    }))
  }
  login(email: string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2QU8W9bPNv-vnkX_7YA6gSZOcEfqdhqk',
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

error mesage improove
In firebase we have several error messages we can check with a swich statement btwen them, we can do this in the componenet but is much leaner to do this in service using pipe and rgx operators like catchError and trowErrow 

we can check if the error response dose not have a error key to avoid the switch to fail and we will trow erro (an abservabele that wraps ower error message) otherwise we will make it in to the switch.

Now that the error conversion happens in the authService, in the auth componenet in the error case we get only a observable that includes one error message we can provide it to our template
*/
/*
Login proces
We nned to send a request, we need to send a request, in firebase we we get all details we need like the signup proces don"t forget to add the API KEY
Again we only prepare the observebele here sow wenned to return it and subscribe to it in authComponent.ts
we alsow need to export AuthResponseData to use it in authComponent
*/