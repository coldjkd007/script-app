import {Component, ViewChild} from '@angular/core';
import {LoadingController, MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {HomePage} from "../pages/home/home";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../Services/user.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  signinPage   = SigninPage;
  signupPage   = SignupPage;
  rootPage:any = HomePage;
  isAuthenticated:boolean = false;
  authSubscription:Subscription;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private uService:UserService,
              private loadingCtr:LoadingController) {


    this.authSubscription = this.uService.navItem$.subscribe(
      (user) =>{
        if(user){
          this.isAuthenticated=true;
        }
        else{
          this.isAuthenticated=false;
        }
      }
    );


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    //this.nav.setRoot(page);
    this.nav.push(page);
    this.menuCtrl.close();
  }

  onLogout() {
    const loading = this.loadingCtr.create({
      content: 'Signing you out...'
    });
    loading.present();
    this.uService.logout();
    this.nav.setRoot(HomePage).then(
      ()=>{
        loading.dismiss();
      }
    );
  }
}
