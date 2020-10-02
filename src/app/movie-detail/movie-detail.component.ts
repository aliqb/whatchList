import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GetMoviesService } from '../get-movies.service';
import { Movie } from '../movie.model';
import {switchMap} from 'rxjs/operators'
import { ListService } from '../list.service';
import { Subscription } from 'rxjs';
interface RatingData{
  Source:string;
  Value:string;
}
interface MovieData {
  Title:string;
  Year:string;
  Rated:string;
  Released:string;
  Runtime:string;
  Genre:string;
  Director:string;
  Writer:string;
  Actors:string;
  Plot:string;
  Language:string;
  Country:string;
  Awards:string;
  Poster:string;
  Ratings:RatingData[];
  Metascore:string;
  imdbRating:string;
  imdbVotes:string;
  imdbID:string;
  Type:string;
  DVD:string;
  BoxOffice:string;
  Production:string;
  Website:string;
  Response:string;
}
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit,OnDestroy {
  movie: Movie;
  message: string = "Loading...";
  added:boolean;
  addOrRemoveSubs: Subscription;
  constructor(private getService: GetMoviesService, private rout: ActivatedRoute,private listService:ListService) { }

  ngOnInit(): void {
    // this.rout.params.subscribe(data => {
    //   this.getMovie(this.rout.snapshot.params['id']);
    // })
    this.rout.params.pipe(
      switchMap(data=>{
        return this.getService.getMovieById(this.rout.snapshot.params['id']);
      })
    ).subscribe((movieData:MovieData)=>{
      if(movieData.Response==='True'){
        this.movie=new Movie({
          title:movieData.Title,
          year:Number(movieData.Year),
          rated:movieData.Rated,
          runTime:movieData.Runtime,
          genre:movieData.Genre,
          director:movieData.Director,
          writer:movieData.Writer,
          actors:movieData.Actors,
          plot:movieData.Plot,
          language:movieData.Language,
          country:movieData.Country,
          awards:movieData.Awards,
          poster:movieData.Poster,
          rating:movieData.Ratings.map((rating)=>{
            return {source:rating.Source,value:rating.Value}
          }),
          id:movieData.imdbID,
          type:movieData.Type     
        })
        this.message='';
        this.getAdded();
      }else{
        this.message="There is no movie with this id"
      }
    })
  }
  private getAdded(){
    this.added = this.listService.hasItem(this.movie.id);
    this.addOrRemoveSubs = this.listService.addOrDelete.subscribe(() => {
      this.added = this.listService.hasItem(this.movie.id);
    })
  }
  toggletoList(){
    if (this.added) {
      this.listService.deleteItem(this.movie.id);
    } else {

      this.listService.addItem(this.movie.poster, this.movie.title, this.movie.year, this.movie.id);
    }
  }
  ngOnDestroy(){
    if(this.addOrRemoveSubs){
      this.addOrRemoveSubs.unsubscribe();
    }
  }
  // private getMovie(id: string) {
  //   this.getService.getMovieById(id).subscribe((movieData:MovieData)=>{
  //     if(movieData.Response==='True'){
  //       this.movie=new Movie({
  //         title:movieData.Title,
  //         year:Number(movieData.Year),
  //         rated:movieData.Rated,
  //         runTime:movieData.Runtime,
  //         genre:movieData.Genre,
  //         director:movieData.Director,
  //         writer:movieData.Writer,
  //         actors:movieData.Actors,
  //         plot:movieData.Plot,
  //         language:movieData.Language,
  //         counry:movieData.Country,
  //         awards:movieData.Awards,
  //         poster:movieData.Poster,
  //         rating:movieData.Ratings.map((rating)=>{
  //           return {source:rating.Source,value:rating.Value}
  //         }),
  //         id:movieData.imdbID,
  //         type:movieData.Type     
  //       })
  //     }else{
  //       this.message="There is no movie with this id"
  //     }
  //   })
  // }

}
