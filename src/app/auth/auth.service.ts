import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../User.model';
import { AuthResponse } from './models/auth.models';

export interface responseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user=new BehaviorSubject<User>(null);
  // private logOutTimer;

  constructor(
    private router:Router,
    private _fireAuth:AngularFireAuth,
    private http: HttpClient) { }

    private prefix = "auth";
  signUp(username: string,email: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${this.prefix}/signUp`,
    {
      email:email,
      password:password,
      username: username
    }
    ).pipe(catchError(this.handleError),tap(responseData=>{
      const user = responseData.user
      this.handleAuth(user.username,user.email,responseData.token);
    }))
  }

  
  // signUp(email: string, password: string) {
  //   const signUpObv:Observable<any>=from(this._fireAuth.createUserWithEmailAndPassword(email,password));
  //   signUpObv.pipe(catchError(this.handleError))
  //   return signUpObv;

  // }

  test(){
    return this.http.get('http://localhost:8888/api/test')
  }

  logIn(email: string, password: string){
    return this.http.post<AuthResponse>(`${environment.apiUrl}${this.prefix}/login`,
    {
      email:email,
      password:password
    }
    ).pipe(catchError(this.handleError)
    ,tap(responseData=>{
      const user = responseData.user
      this.handleAuth(user.username,user.email,responseData.token);
    }))
  }

  logout(){
    // this._fireAuth.signOut()
    // .then(data=>{
    //   // console.log(data);
    //   this.router.navigate(['/auth']);
    // })
    this.user.next(null);
    // if(this.router.url==='/watchList'){
      // this.router.navigate(['/auth']);
    // }
    localStorage.removeItem('userData');
      this.router.navigate(['/auth']);

    // if(this.logOutTimer){
    //   clearTimeout(this.logOutTimer);
    // }
    // this.logOutTimer=null;
  }

  autoLogIn(){
    const userData: {
      email: string;
      usrname: string;
      _token: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(userData){
      const user=new User(userData.usrname,userData.email,userData._token);
      if(user.token){
        this.user.next(user);
        // const expireDuration=new Date(userData._tokenExpirationDate).getTime() -new Date().getTime() ;
        // console.log(expireDuration);
        // this.autoLogOut(expireDuration)
      }
    }

  }
  
  // private autoLogOut(expireDuration:number){
  //   // this.logOutTimer=setTimeout(()=>{
  //   //   this.user.next(null);
  //   //   this.logout();
  //   // },expireDuration)
  // }
  private handleAuth(username:string ,email:string,token:string,expireIn?:number){
    // const expireDate=new Date(new Date().getTime() + expireIn*1000);
    const user=new User(username,email,token);
    this.user.next(user);
    console.log(user)
    localStorage.setItem('userData',JSON.stringify(user));
    // this.autoLogOut(expireIn*1000);
    
  }

  private handleError(err:HttpErrorResponse){
    console.log(err)
    let errMsg="an unknow error occurd!"
    if(err.error.message){
      errMsg = err.error.message;
    }
    // if(err.error,err.error.error){
    //   switch (err.error.error.message) {
    //     case 'EMAIL_EXISTS':
    //       errMsg = 'This email exists already';
    //       break;
    //     case 'EMAIL_NOT_FOUND':
    //       errMsg = 'This email does not exist.';
    //       break;
    //     case 'INVALID_PASSWORD':
    //       errMsg = 'This password is not correct.';
    //       break;
    //   }
    // }
    return throwError(errMsg);
  }
}
