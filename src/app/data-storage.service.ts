import { Injectable } from '@angular/core';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private listServide:ListService) { }
}
