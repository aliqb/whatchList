import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMoviesService } from '../get-movies.service';
import { Movie } from '../movie.model';
interface MovieData {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
}
interface SearchData {
  totalResults: string;
  Response: string;
  Search: MovieData[];
}
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  message: string = "type to search movie or series";
  title: string = '';
  type: string = 'all';
  movies: Movie[] = [];
  pages: number;
  currentPage: number = 1;
  constructor(private getService: GetMoviesService, private router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.title);
    this.rout.queryParams.subscribe(query => {
      // this.title=this.rout.snapshot.queryParams['title'];
      // console.log(this.rout.snapshot.queryParams['title']);
      this.currentPage = +this.rout.snapshot.queryParams['page'];
      this.type=this.rout.snapshot.queryParams['type'];
      // console.log('o',this.type);
      if(!this.type){
        this.type='all';
      }
      this.getMovies();

    })
  }
  search() {
    // console.log(this.type);
    // console.log(this.title);
    if (this.title) {
      console.log('in')
      let params: {};
      if (this.type === 'all') {
        params = { title: this.title, page: 1 }
      } else {
        console.log('t');
        params = { title: this.title, page: 1, type: this.type };
      }
      this.router.navigate([''], { relativeTo: this.rout, queryParams: params })
    }
  }
  private getMovies() {
    this.getService.searchByTitle(
      this.rout.snapshot.queryParams['title'], this.currentPage, this.type === 'all' ? "" : this.type
)
      .subscribe((data: SearchData) => {
      this.message = "";
      if (data.Response === 'True') {

        this.movies = data.Search.map(md => {
          return new Movie({ title: md.Title, year: Number(md.Year), id: md.imdbID, type: md.Type, poster: md.Poster })
        });
        this.pages = Math.ceil(Number(data.totalResults) / 10);
      }
      else {
        this.message = this.title ? "No movie or series find" : "type to search movie or series";
        this.movies = [];
      }
    })
  }
  paginationMaker() {
    let arr = [];
    let max;
    let min;
    if (this.currentPage + 4 < this.pages) {
      max = this.currentPage + 4;
      min = this.currentPage
    } else {
      max = this.pages;
      if (this.pages > 4) {

        min = this.pages - 4;
      } else {
        min = 1;
      }
    }
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    // if(this.pages>6){
    //   arr.push('...')
    // }
    // if(max!==this.pages){
    //   arr.push(this.pages)
    // }
    return arr;
  }
  nextPage() {
    this.router.navigate([''], { relativeTo: this.rout, queryParams: { title: this.title, page: this.currentPage + 1 } });
  }
  prevPage() {
    this.router.navigate([''], { relativeTo: this.rout, queryParams: { title: this.title, page: this.currentPage - 1 } });
  }

}
