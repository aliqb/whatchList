import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpMode:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  changeMode(){
    this.signUpMode= !this.signUpMode;
  }

}
