import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
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

  constructor(private http: HttpClient,private router:Router) { }

  signUp(email: string, password: string) {
    return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey,
    {
      email:email,
      password:password,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(responseData=>{
      this.handleAuth(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn);
    }))
  }

  logIn(email: string, password: string){
    return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,
    {
      email:email,
      password:password,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(responseData=>{
      this.handleAuth(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn);
    }))
  }

  logout(){
    this.user.next(null);
    // console.log('c',this.router.url);
    if(this.router.url==='/watchList'){
      this.router.navigate(['/auth']);
    }
    localStorage.removeItem('userData');
    if(this.logOutTimer){
      clearTimeout(this.logOutTimer);
    }
    this.logOutTimer=null;
  }

  autoLogIn(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(userData){
      const user=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
      if(user.token){
        this.user.next(user);
        const expireDuration=new Date(+userData._tokenExpirationDate).getTime() -new Date().getTime() ;
        // console.log(expireDuration);
        this.autoLogOut(expireDuration)
      }
    }

  }
  
  private autoLogOut(expireDuration:number){
    this.logOutTimer=setTimeout(()=>{
      this.user.next(null);
      this.logout();
    },expireDuration)
  }
  private handleAuth(email:string,id:string,token:string,expireIn:number){
    const expireDate=new Date(new Date().getTime() + expireIn*1000);
    const user=new User(email,id,token,expireDate);
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
    this.autoLogOut(expireIn*1000);
    
  }

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
