import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogIn = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLogIn = !this.isLogIn;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLogIn) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);      
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false
      }, errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);
        this.isLoading = false
      }
    )
    form.reset();
  }
}

/*
Time to fire the sign up,
we need to extract the email and password each in a const, and allsow we can add if logic to disable the submit if the form is invalid
now we need to inject the auth.service and than call the signgup() and set email and password as param.
after taht we need to sbscribe to the response lets log in console the data and the error
we should do sumething about the is loging we will check if we are logging (here we don"t do enithing now) or else were we will send http request
we allwais want to reset the form after the submit
 */

 /* 
 Adding a loading spinner we can make a new component in a shared folder, we need only the ts file and the css file 
 
 */
/*
Error handling
We want to show a error message
we will store te error in a error initial will be null of type string, onSubmit in addition to log the error we set error to a error message and in template we display it see the logic

*/


