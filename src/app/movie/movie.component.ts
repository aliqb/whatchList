import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie:Movie;
  constructor(private router:Router,private rout:ActivatedRoute,private listService:ListService) { }

  ngOnInit(): void {
  }
  navigate(event){
    if(!((<HTMLElement>event.target).tagName==='BUTTON')){
      // console.log('n');
      this.router.navigate([this.movie.id],{relativeTo:this.rout});
    }
  }
  addtoList(){
    // console.log("e")
    this.listService.addItem(this.movie.poster,this.movie.title,this.movie.year,this.movie.id);
  }
}
