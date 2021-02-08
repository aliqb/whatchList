import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './data-storage.service';
import { ListService } from './list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'movies';
  lsitSubs:Subscription;
  authSubs:Subscription
  constructor(private dataService:DataStorageService,private listService:ListService,private fireAuth:AngularFireAuth){}
  ngOnInit(){
    // this.authService.autoLogIn();
    this.lsitSubs=this.listService.itemsChange.subscribe(data=>{
      this.dataService.saveItems();
    })
    // this.authSubs=this.fireAuth.authState.subscribe((user)=>{
    //   if(user){
    //     console.log('authchange');
    //     // this.listService.setItems([]);
    //     this.dataService.fetchItems(user.uid);
    //   }
    // })
  }
  ngOnDestroy(){
    if(this.lsitSubs){
      this.lsitSubs.unsubscribe();
    }
    if(this.authSubs){
      this.authSubs.unsubscribe();
    }
  }
}
