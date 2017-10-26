import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../Services/user.service";
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";
import {User} from "../../models/user.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAuthenticated :boolean = false;
  userName:string ='';
  authSubscription:Subscription;
  greetingMsg     :string;
  signinPage = SigninPage;
  signupPage = SignupPage;

  constructor(public navCtrl: NavController,
              private uService:UserService) {
    this.subscribeToAuthStatus();
    this.setGreetingMsg();
  }

  setGreetingMsg(){
    var myDate = new Date();
    var hrs = myDate.getHours();

    if (hrs < 12)
      this.greetingMsg = 'Good Morning '+this.userName;
    else if (hrs >= 12 && hrs <= 17)
      this.greetingMsg = 'Good Afternoon '+this.userName;
    else if (hrs >= 17 && hrs <= 24)
      this.greetingMsg = 'Good Evening '+this.userName;

    console.log('userName - '+this.userName);
  }

  subscribeToAuthStatus(){
    this.authSubscription = this.uService.navItem$.subscribe(
      (user:User) =>{
        if(user){
          this.userName=user.firstName;
          this.isAuthenticated=true;
          console.log('got it!!');
        }
        else{
          this.userName='';
          this.isAuthenticated=false;
        }
      }
    );
  }
}
