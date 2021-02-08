import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { ListItem } from '../list-item.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit,OnDestroy {
  toWatch:ListItem[]=[];
  wathced:ListItem[]=[];
  changeSubs:Subscription;
  storageSubs:Subscription;
  constructor(private listServie:ListService,private dataService:DataStorageService,private fireAuth:AngularFireAuth) { }

  ngOnInit(): void {
    // this.setArrs(this.listServie.getItems());
    this.fireAuth.currentUser.then(user=>{
      if(user){
        this.dataService.fetchItems(user.uid);
      }
    })
    this.changeSubs=this.listServie.itemsChange.subscribe((items:ListItem[])=>{
      // console.log('l',items);
      this.setArrs(items);
    })
  }
  private setArrs(items:ListItem[]){
    this.toWatch=items.filter((item:ListItem)=>{
      return !item.watched;
    })
    this.wathced=items.filter((item:ListItem)=>{
      return item.watched;
    })
  }
  ngOnDestroy(){
    if(this.changeSubs){
      this.changeSubs.unsubscribe();
    }
  }

}
