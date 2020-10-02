import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from 'src/app/list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor() { }
  @Input() item:ListItem;
  editMode:boolean=false;
  ngOnInit(): void {
  }

}
