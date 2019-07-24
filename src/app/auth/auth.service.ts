import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.module';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

export interface AuthResponseData {
  kind: string,
  idToken: string,
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
  user = new BehaviorSubject<User>(null); 
/* Behavior subject allows us to subscribe even at a latere time long after the subject was fired */

private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebadeAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.hadleError),
        tap(resData => {
          this.handleAuthentification(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }
        ));
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebadeAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.hadleError),
        tap(resData => {
          this.handleAuthentification(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      );
  }
  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if( this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentification(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    )
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private hadleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error accurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already in use!'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email adress dose not exist!'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password please try again!'
    }
    return throwError(errorMessage);
  }
  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token){
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
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