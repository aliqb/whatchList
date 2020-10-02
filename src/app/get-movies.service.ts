import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {
  constructor(private http: HttpClient) { }

  searchByTitle(title: string, page: number = 1) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apiKey', environment.apikey);
    searchParams = searchParams.append('s', title);
    searchParams = searchParams.append('page', String(page));
    return this.http.get("http://www.omdbapi.com/", { params: searchParams })
  }
  getMovieById(id: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apiKey', environment.apikey);
    searchParams = searchParams.append('i', id);
    searchParams = searchParams.append('plot','full');
    return this.http.get("http://www.omdbapi.com/", { params: searchParams })
  }
}
