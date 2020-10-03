import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpMode:boolean=false;
  form:FormGroup;
  fuck="fuck";
  password:string;
  constructor() { }

  ngOnInit(): void {
    this.makeForm();
  }
  setPassword(){
    this.password=this.form.controls['password'].value;
  }
  onSubmit(){
    console.log(this.form);
    // console.log(this.form.controls.password.value,this.form.controls.passwordRepeat.value,this.form.controls.password.value===this.form.controls.passwordRepeat.value)
  }
  private makeForm(){
    if(this.signUpMode){
      this.form=new FormGroup({
        'email':new FormControl('',[Validators.required,Validators.email]),
        'password':new FormControl('',[Validators.required,Validators.minLength(6)]),
        'passwordRepeat':new FormControl('',[this.repPasswordValidator.bind(this)])
  
      })
    }else{
      this.form=new FormGroup({
        'email':new FormControl('',[Validators.required,Validators.email]),
        'password':new FormControl('',[Validators.required,Validators.minLength(6)]),  
      })
    }
  }
  changeMode(){
    this.signUpMode= !this.signUpMode;
    this.makeForm();
    
  }
  private repPasswordValidator(control:FormControl):{[s:string]:boolean}{
    // console.log('v',control.value,this.password)
    console.log(this.signUpMode)
    // if(!this.signUpMode){
    //   return null
    // }
    if(control.value!==this.password && this.signUpMode){
      return {'notSame':true}
    }
    return null;
  }

}
