import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../User.model';

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
  private logOutTimer;

  constructor(private http: HttpClient,
    private router:Router,
    private _fireAuth:AngularFireAuth) { }

  // signUpOld(email: string, password: string) {
  //   return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey,
  //   {
  //     email:email,
  //     password:password,
  //     returnSecureToken:true
  //   }
  //   ).pipe(catchError(this.handleError),tap(responseData=>{
  //     this.handleAuth(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn);
  //   }))
  // }

  
  signUp(email: string, password: string) {
    const signUpObv:Observable<any>=from(this._fireAuth.createUserWithEmailAndPassword(email,password));
    signUpObv.pipe(catchError(this.handleError))
    return signUpObv;

  }

  // logInOld(email: string, password: string){
  //   return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,
  //   {
  //     email:email,
  //     password:password,
  //     returnSecureToken:true
  //   }
  //   ).pipe(catchError(this.handleError),tap(responseData=>{
  //     this.handleAuth(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn);
  //   }))
  // }

  logIn(email: string, password: string){
    const loginObv:Observable<any>=from(
      this._fireAuth.signInWithEmailAndPassword(email,password)
    )
    loginObv.pipe(catchError(this.handleError));
    return loginObv;
  }

  logout(){
    this._fireAuth.signOut()
    .then(data=>{
      console.log(data);
      this.router.navigate(['/auth']);
    })
    // this.user.next(null);
    // if(this.router.url==='/watchList'){
      // this.router.navigate(['/auth']);
    // }
    // localStorage.removeItem('userData');
    // if(this.logOutTimer){
    //   clearTimeout(this.logOutTimer);
    // }
    // this.logOutTimer=null;
  }

  autoLogIn(){
    // const userData: {
    //   email: string;
    //   id: string;
    //   _token: string;
    //   _tokenExpirationDate: string;
    // } = JSON.parse(localStorage.getItem('userData'));
    // if(userData){
    //   const user=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    //   if(user.token){
    //     console.log('al',user);
    //     this.user.next(user);
    //     const expireDuration=new Date(userData._tokenExpirationDate).getTime() -new Date().getTime() ;
    //     console.log(expireDuration);
    //     this.autoLogOut(expireDuration)
    //   }
    // }

  }
  
  private autoLogOut(expireDuration:number){
    // this.logOutTimer=setTimeout(()=>{
    //   this.user.next(null);
    //   this.logout();
    // },expireDuration)
  }
  // private handleAuth(email:string,id:string,token:string,expireIn:number){
  //   const expireDate=new Date(new Date().getTime() + expireIn*1000);
  //   const user=new User(email,id,token,expireDate);
  //   this.user.next(user);
  //   localStorage.setItem('userData',JSON.stringify(user));
  //   this.autoLogOut(expireIn*1000);
    
  // }

  private handleError(err:HttpErrorResponse){
    let errMsg="an unknow error occurd!"
    if(err.error,err.error.error){
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          errMsg = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errMsg = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errMsg = 'This password is not correct.';
          break;
      }
    }
    return throwError(errMsg);
  }
}
