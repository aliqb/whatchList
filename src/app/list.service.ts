import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListItem } from './list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  items: ListItem[] = [
    new ListItem(
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      "The GodFather",
      1972,
      "tt0068646",
      true,
    // 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur cumque, quam dolore inventore maxime eveniet modi exercitationem eligendi reiciendis ducimus corporis libero illum, magni voluptates adipisci asperiores aliquam et eos.'
    )
  ];
  itemsChange = new Subject<ListItem[]>();
  constructor() { }
  getItems(): ListItem[] {
    return this.items.slice();
  }
  addItem(poster: string, title: string, year: number, id: string, watched: boolean = false) {
    const item = new ListItem(poster, title, year, id);
    this.items.push(item);
    this.itemsChange.next(this.getItems());
  }
  changeItem(id: string, watched: boolean, description) {
    let item = this.items.find((item: ListItem) => {
      return item.id === id;
    });
    item.watched = watched;
    this.itemsChange.next(this.getItems());
  }
  deleteItem(id:string){
    const index=this.items.findIndex((item:ListItem)=>{
      return item.id===id;
    });
    this.items.splice(index,1);
    this.itemsChange.next(this.getItems());
  }
}
