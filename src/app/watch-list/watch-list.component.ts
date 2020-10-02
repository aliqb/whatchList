import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list-item.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  toWatch:ListItem[]=[];
  wathced:ListItem[]=[];
  constructor(private listServie:ListService) { }

  ngOnInit(): void {
    this.setArrs(this.listServie.getItems());
    this.listServie.itemsChange.subscribe((items:ListItem[])=>{
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

}
