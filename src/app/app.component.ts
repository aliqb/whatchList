import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private authService:AuthService,private dataService:DataStorageService,private listService:ListService){}
  ngOnInit(){
    console.log('f');
    this.authService.autoLogIn();
    this.lsitSubs=this.listService.itemsChange.subscribe(data=>{
      this.dataService.saveItems();
    })
    this.authSubs=this.authService.user.subscribe((user:User)=>{
      if(user){

        this.dataService.fetchItems(user);
      }
    })
  }
  test(){
    this.dataService.saveItems();
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
