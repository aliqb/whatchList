import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListItem } from './list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  items: ListItem[]=[];
  itemsChange = new Subject<ListItem[]>();
  addOrDelete = new Subject<null>();
  constructor() { }
  getItems(): ListItem[] {
    return this.items.slice();
  }

  addItem(poster: string, title: string, year: string, id: string, watched: boolean = false) {
    const item = new ListItem(poster, title, year, id);
    this.items.push(item);
    this.itemsChange.next(this.getItems());
    this.addOrDelete.next();
  }
  changeWatched(id: string) {
    let index = this.items.findIndex((item: ListItem) => {
      return item.id === id;
    });
    // console.log("s!",item);
    const item=this.items[index];
    item.watched=!item.watched;
    this.items.splice(index,1);
    this.items.push(item);
    this.itemsChange.next(this.getItems());
  }
  deleteItem(id: string) {
    const index = this.items.findIndex((item: ListItem) => {
      return item.id === id;
    });
    this.items.splice(index, 1);
    this.itemsChange.next(this.getItems());
    this.addOrDelete.next();
  }
  hasItem(id: string) {
    const index = this.items.findIndex((item: ListItem) => {
      return item.id === id;
    });
    return index !== -1;
  }
  setItems(items: ListItem[]) {
    this.items = items;
    this.itemsChange.next(this.getItems());
  }
}
