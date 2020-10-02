import { Component, Input, OnInit } from '@angular/core';
interface RatingData {
  source: String,
  value: string,
}
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  logo: string;
  rate: string;
  @Input() ratingData: RatingData;
  constructor() { }

  ngOnInit(): void {
    switch (this.ratingData.source) {
      case 'Internet Movie Database':
        this.logo = "../../../assets/imdb.png";
        break;
      case 'Rotten Tomatoes':
        this.logo = "../../../assets/rotten.png";
        break;
      case 'Metacritic':
        this.logo = "../../../assets/meta.png";
        break;
    }
    this.rate=this.ratingData.value;
  }

}
