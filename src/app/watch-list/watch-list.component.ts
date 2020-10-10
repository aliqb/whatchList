import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(private listServie:ListService) { }

  ngOnInit(): void {
    this.setArrs(this.listServie.getItems());
    this.changeSubs=this.listServie.itemsChange.subscribe((items:ListItem[])=>{
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
