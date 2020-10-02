import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListItem } from './list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  items:ListItem[]=[
    new ListItem(
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      "The GodFather",
      1972,
      "tt0068646",
    )
  ];
  itemsChange=new Subject<ListItem[]>();
  constructor() { }
  getItems():ListItem[]{
    return this.items.slice();
  }
  addItem(poster:string,title:string,year:number,id:string,watched:boolean=false){
    const item=new ListItem(poster,title,year,id);
    this.items.push(item);
    this.itemsChange.next(this.getItems());
  }
}
