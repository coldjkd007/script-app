import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {LoadingController, AlertController, NavController} from "ionic-angular";
import {UserService} from "../../Services/user.service";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private uService:UserService,
              private navCtr:NavController) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.uService.getUserWithEmailPass(form.value.email,form.value.password) .subscribe(
      (response)=>{
        console.log(response);
        loading.dismiss();
        form.reset();
        const alert = this.alertCtrl.create({
          title: 'Signin Successful!',
          message: '',
          buttons: ['Ok']
        });
        alert.present();

        console.log(response.json().pop());

        this.uService.changeUser(response.json().pop());
        this.navCtr.setRoot(HomePage);
      },
      (error)=>{
        console .log(error);
        loading .dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.json().message,
          buttons: ['Ok']
        });
        alert.present();
      }
    );

  }
}
