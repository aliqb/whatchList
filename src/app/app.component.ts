import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './data-storage.service';
import { ListService } from './list.service';
import { User } from './User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'movies';
  lsitSubs:Subscription;
  authSubs:Subscription
  constructor(private authService:AuthService,private dataService:DataStorageService,private listService:ListService,private fireAuth:AngularFireAuth){}
  ngOnInit(){
    console.log('f');
    this.authService.autoLogIn();
    this.lsitSubs=this.listService.itemsChange.subscribe(data=>{
      console.log('wtf');
      this.dataService.saveItems();
    })
    this.authSubs=this.fireAuth.authState.subscribe((user)=>{
      if(user){
        console.log('authchange');
        this.dataService.fetchItems(user.uid);
      }
    })
  }
  test(){
    // this.fireAuth.authState.subscribe(user=>{
    //   if(user){
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
