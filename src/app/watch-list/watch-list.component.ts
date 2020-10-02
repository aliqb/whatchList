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
    this.toWatch=this.listServie.getItems().filter((item:ListItem)=>{
      return !item.watched;
    })
    this.wathced=this.listServie.getItems().filter((item:ListItem)=>{
      return item.watched;
    })
  }

}
