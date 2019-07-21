import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogIn = true;

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

    if (this.isLogIn) {
      //...
    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
        }, error => {
          console.log(error);
        }
      )
    }
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
