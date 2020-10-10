import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private listService:ListService,private http:HttpClient) { }
  saveItems(){
    console.log(this.listService.getItems())
    this.http.post("https://watchlist-a8e7c.firebaseio.com/list.json",this.listService.getItems())
    .subscribe(data=>{
      console.log(data);
    })
  }
}
