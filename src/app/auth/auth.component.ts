import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpMode:boolean=true;
  form:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(6)]),
      'passwordRepeat':new FormControl('',[Validators.required,Validators.minLength(6)])

    })
  }
  onSubmit(){
    console.log(this.form);
  }
  changeMode(){
    this.signUpMode= !this.signUpMode;
  }
  // private repPasswordValidator(control:FormControl):{[s:string]:boolean}{
  //   if(control===this.form.)
  // }

}
