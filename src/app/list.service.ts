import { Injectable } from '@angular/core';
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
  ]
  constructor() { }
  getItems():ListItem[]{
    return this.items.slice();
  }
}
