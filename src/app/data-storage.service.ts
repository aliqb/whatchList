import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';
import { ListItem } from './list-item.model';
import { ListService } from './list.service';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private listService: ListService, private http: HttpClient, private authService: AuthService,private fireStore:AngularFirestore,private fireAuth:AngularFireAuth) { }
  fetchItems(user:User) {
    if(user){
      this.http.get("https://watchlist-a8e7c.firebaseio.com/list.json",
      { params: new HttpParams().set('auth', user.token) })
      .subscribe((items:ListItem[])=>{
        this.listService.setItems(items);
      })
    }
  }
  fetchItemsN(uid:string) {
    if(uid){
      this.fireStore
      .collection('lists')
      .doc(uid)
      .collection('userList')
      .valueChanges()
      .subscribe
    }
  }
  saveItemsOld() {
    const user=this.authService.user.value;
    if(user){
      this.http.put("https://watchlist-a8e7c.firebaseio.com/list.json",this.listService.getItems(),{ params: new HttpParams().set('auth', user.token) })
      .subscribe(response=>{
        console.log(response)
      })

    }
  }
  saveItems() {
    console.log(this.listService.getItems())
    // console.log({...this.listService.getItems()})
    // (await this.fireAuth.currentUser).uid;

    this.fireAuth.currentUser.then(user=>{
      const items=this.listService.getItems();
      const id=user.uid;
      const record:ListRecord={id,items}
      this.fireStore
      .collection('lists')
      .doc(user.uid)
      .set({
        items:JSON.stringify(items)
      })
      // .collection('userList')
      // .add({
      //   items: JSON.stringify(items)
      // });
    })
  }
}
interface ListRecord{
  id:string,
  items:ListItem[]
}

