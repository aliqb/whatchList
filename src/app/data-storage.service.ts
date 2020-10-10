import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ListItem } from './list-item.model';
import { ListService } from './list.service';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private listService: ListService, private http: HttpClient, private authService: AuthService) { }
  fetchItems(user:User) {
    if(user){
      this.http.get("https://watchlist-a8e7c.firebaseio.com/list.json",
      { params: new HttpParams().set('auth', user.token) })
      .subscribe((items:ListItem[])=>{
        this.listService.setItems(items);
      })
    }
  }
  saveItems() {
    const user=this.authService.user.value;
    if(user){
      this.http.put("https://watchlist-a8e7c.firebaseio.com/list.json",this.listService.getItems(),{ params: new HttpParams().set('auth', user.token) })
      .subscribe(response=>{
        console.log(response)
      })

    }
  }
}
