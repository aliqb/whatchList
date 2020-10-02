import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list-item.model';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  toWatch:ListItem[]=[];
  wathced:ListItem[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
