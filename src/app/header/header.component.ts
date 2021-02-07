import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  constructor(private fireAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.authSubs=this.fireAuth.authState.subscribe(user=>{
      this.isAuth=!!user;
    })
  }
  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }
  onLogOut(){
    // this.authService.logout();
  }

}
