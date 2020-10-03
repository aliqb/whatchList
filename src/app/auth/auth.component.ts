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
  fuck="fuck";
  password:string;
  constructor() { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(6)]),
      'passwordRepeat':new FormControl('',[Validators.required,Validators.minLength(6),this.repPasswordValidator.bind(this)])

    })
  }
  setPassword(){
    this.password=this.form.controls['password'].value;
  }
  onSubmit(){
    // console.log(this.form);
    // console.log(this.form.controls.password.value,this.form.controls.passwordRepeat.value,this.form.controls.password.value===this.form.controls.passwordRepeat.value)
  }
  changeMode(){
    this.signUpMode= !this.signUpMode;
  }
  private repPasswordValidator(control:FormControl):{[s:string]:boolean}{
    // console.log('v',control.value,this.password)
    if(control.value!==this.password){
      return {'notSame':true}
    }
    return null;
  }

}
