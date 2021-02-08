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
  year: string;
  movies: Movie[] = [];
  pages: number;
  currentPage: number = 1;
  constructor(private getService: GetMoviesService, private router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.queryParams.subscribe(query => {
      if(this.rout.snapshot.queryParams['title']){
        this.title=this.rout.snapshot.queryParams['title'];
      }
      this.currentPage = +this.rout.snapshot.queryParams['page'];
      this.type=this.rout.snapshot.queryParams['type'];
      if(!this.type){
        this.type='all';
      }
      this.year=this.rout.snapshot.queryParams['year'];
      if(!this.year){
        this.year='';
      }
      if(this.title){
        this.getMovies();

      }

    })
  }
  search() {
    let params: {};
    if (this.title) {
      if (this.type === 'all') {
        params = { title: this.title, page: 1 }
      } else {
        params = { title: this.title, page: 1, type: this.type };
      }
      if (this.year) {
        params['year']=this.year;
      }     
    }
    this.router.navigate([''], { relativeTo: this.rout, queryParams: params })
  }
  private getMovies() {
    const type=this.type === 'all' ? "" : this.type;
    const year=this.year ? this.year : '' ;
    this.getService.searchByTitle(
      this.rout.snapshot.queryParams['title'], 
      this.currentPage,
      type,
      year)
      .subscribe((data: SearchData) => {
      this.message = "";
      if (data.Response === 'True') {

        this.movies = data.Search.map(md => {
          return new Movie({ title: md.Title, year: md.Year, id: md.imdbID, type: md.Type, poster: md.Poster })
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
    this.router.navigate([''], { relativeTo: this.rout,queryParamsHandling:"merge", queryParams: { page: this.currentPage + 1 } });
  }
  prevPage() {
    this.router.navigate([''], { relativeTo: this.rout,queryParamsHandling:'merge', queryParams: { page: this.currentPage - 1 } });
  }

}
