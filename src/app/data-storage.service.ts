import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { ListService } from './list.service';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private listService: ListService, private http: HttpClient, private authService: AuthService) { }
  saveItems() {
    // console.log(this.listService.getItems())
    // this.http.put("https://watchlist-a8e7c.firebaseio.com/list.json",this.listService.getItems())
    // .subscribe(data=>{
    //   console.log(data);
    // })
    this.authService.user
    .pipe(
      switchMap((user: User) => {
        if (user) {
          return this.http.put("https://watchlist-a8e7c.firebaseio.com/list.json",
           this.listService.getItems(),
           {params:new HttpParams().set('auth',user.token)})
        }
      })
    )
    .subscribe(respone=>{
      console.log(respone)
    })
  }
}
