import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ListItem } from './list-item.model';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient:HttpClient,private listService:ListService) { }
  fetchItems(){
    this.httpClient.get('./assets/list.json').pipe(
      tap((items:ListItem[])=>{
       
      })
    )
  }
  saveItems(){
    return this.httpClient.post('./list.json',this.listService.getItems());
  }
}
