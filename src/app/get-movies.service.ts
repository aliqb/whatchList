import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {
  constructor(private http: HttpClient) { }

  searchByTitle(title: string, page: number = 1,type: string = "",year: string = "") {
    console.log('s');
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apiKey', environment.movieApikey);
    searchParams = searchParams.append('s', title);
    searchParams = searchParams.append('page', String(page));
    if(type){
      // console.log(type);
      searchParams = searchParams.append('type',type);
    }
    if(year){
      // console.log(type);
      searchParams = searchParams.append('y',year);
    }
    return this.http.get("https://www.omdbapi.com/", { params: searchParams })
  }
  getMovieById(id: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apiKey', environment.movieApikey);
    searchParams = searchParams.append('i', id);
    searchParams = searchParams.append('plot','full');
    return this.http.get("https://www.omdbapi.com/", { params: searchParams })
  }
}
