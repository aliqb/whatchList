import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListService } from '../list.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  @Input() movie: Movie;
  added: boolean;
  addOrRemoveSubs: Subscription;
  constructor(private router: Router, private rout: ActivatedRoute, private listService: ListService) { }

  ngOnInit(): void {
    this.added = this.listService.hasItem(this.movie.id);
    this.addOrRemoveSubs = this.listService.addOrDelete.subscribe(() => {
      this.added = this.listService.hasItem(this.movie.id);
    })
  }
  navigate(event) {
    if (!((<HTMLElement>event.target).tagName === 'BUTTON')) {
      // console.log('n');
      this.router.navigate([this.movie.id], { relativeTo: this.rout });
    }
  }
  addtoList() {
    // console.log("e")
    if (this.added) {
      this.listService.deleteItem(this.movie.id);
    } else {

      this.listService.addItem(this.movie.poster, this.movie.title, this.movie.year, this.movie.id);
    }
  }
  ngOnDestroy() {
    if (this.addOrRemoveSubs) {
      this.addOrRemoveSubs.unsubscribe();
    }
  }
}
