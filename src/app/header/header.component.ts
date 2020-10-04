import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuth:boolean=false;
  authSubs:Subscription
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubs=this.authService.user.subscribe(user=>{
      this.isAuth=!!user;
    })
  }
  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

}
