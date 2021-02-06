import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, responseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  signUpMode:boolean=false;
  form:FormGroup;
  errMsg:string="";
  password:string;
  authSubs:Subscription;
  constructor(private authService:AuthService,private router:Router,private rout:ActivatedRoute) { }

  ngOnInit(): void {
    this.makeForm();
  }
  setPassword(){
    this.password=this.form.controls['password'].value;
  }
  onSubmit(){
    let authObservable:Observable<responseData>
    if(this.signUpMode){
      authObservable=this.authService.signUp(this.form.controls['email'].value,this.form.controls['password'].value)
    }else{
      authObservable=this.authService.logIn(this.form.controls['email'].value,this.form.controls['password'].value)
    }
    this.authSubs=authObservable.subscribe((reponseData:responseData)=>{
      console.log(reponseData);
      
      this.errMsg="";
      this.router.navigate(['/watchList']);
    },errorData=>{
      this.errMsg=errorData;
    })

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
    this.errMsg="";
    this.makeForm();
    
  }
  private repPasswordValidator(control:FormControl):{[s:string]:boolean}{
    if(control.value!==this.password && this.signUpMode){
      return {'notSame':true}
    }
    return null;
  }
  ngOnDestroy(){
    if(this.authSubs){
      this.authSubs.unsubscribe();
    }
  }
}
