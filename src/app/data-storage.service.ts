import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { ListItem } from './list-item.model';
import { ListService } from './list.service';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private listService: ListService, private http: HttpClient, private authService: AuthService,private fireStore:AngularFirestore,private fireAuth:AngularFireAuth) { }
  // fetchItemsOld(user:User) {
  //   if(user){
  //     this.http.get("https://watchlist-a8e7c.firebaseio.com/list.json",
  //     { params: new HttpParams().set('auth', user.token) })
  //     .subscribe((items:ListItem[])=>{
  //       this.listService.setItems(items);
  //     })
  //   }
  // }
  fetchItems(uid:string) {
    console.log('fe');
    
    if(uid){
      this.fireStore
      .collection('lists')
      .doc(uid)
      // .valueChanges()
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(data=>{
        // console.log(data.payload.data()['items']);
        if(data.payload.data()){
          const items:ListItem[]=JSON.parse(data.payload.data()['items']);
          console.log('fff');
          
          this.listService.setItems(items);        
        }
      })
    }
  }
  // saveItemsOld() {
  //   const user=this.authService.user.value;
  //   if(user){
  //     this.http.put("https://watchlist-a8e7c.firebaseio.com/list.json",this.listService.getItems(),{ params: new HttpParams().set('auth', user.token) })
  //     .subscribe(response=>{
  //       console.log(response)
  //     })

  //   }
  // }
  saveItems() {
    this.fireAuth.currentUser.then(user=>{
      const items=this.listService.getItems();
      const id=user.uid;
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

