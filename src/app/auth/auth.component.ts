import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  onSubmit(form: NgForm){
    console.log(form.value);
    form.reset;
    
  }
}
