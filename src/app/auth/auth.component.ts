import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogIn = true;

  constructor() { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLogIn = !this.isLogIn;
  }

}
