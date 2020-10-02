import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie:Movie;
  constructor(private router:Router,private rout:ActivatedRoute) { }

  ngOnInit(): void {
  }
  navigate(event){
    if(!((<HTMLElement>event.target).tagName==='BUTTON')){
      console.log('n');
      this.router.navigate([this.movie.id],{relativeTo:this.rout});
    }
  }
  addtoList(){
    console.log("e")
  }
}
