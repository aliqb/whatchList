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
    this.listService.itemsChange.subscribe(data=>{
      this.dataService.saveItems();
    })
    this.authService.user.subscribe((user:User)=>{
      this.dataService.fetchItems(user);
    })
  }
  ngOnDestroy(){
    if(this.lsitSubs){
      this.lsitSubs.unsubscribe();
    }
  }
}
