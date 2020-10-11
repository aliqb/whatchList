import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from 'src/app/list-item.model';
import { ListService } from 'src/app/list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor(private listService:ListService) { }
  @Input() item:ListItem;
  editMode:boolean=false;

  ngOnInit(): void {
  }
  changeWatched(){
    this.listService.changeWatched(this.item.id,!this.item.watched);
  }
  deleteItem(){
    this.listService.deleteItem(this.item.id);
  }
  addDesc(){
    this.editMode=false;
    this.listService.itemsChange.next(this.listService.getItems());
  }

}
