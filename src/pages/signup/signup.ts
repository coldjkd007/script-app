import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {LoadingController, AlertController, NavController} from "ionic-angular";
import {UserService} from "../../Services/user.service";
import {User} from "../../models/user.model";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private uService:UserService,
              private navCtr:NavController) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();

    const user:User = {
      userId:'',
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      state: form.value.state,
      zipCode: form.value.zipCode,
      phoneNo: form.value.phoneNo,
      email: form.value.email,
      isReceiveEmailNotification: true,
      userType: 'passenger',
      password: form.value.password
    };

    this.uService.registerUser(user).subscribe(
      (response)=>{
        console.log(response);
        loading.dismiss();
        form.reset();
        const alert = this.alertCtrl.create({
          title: 'Signup Successful!',
          message: 'User registration completed successfully',
          buttons: ['Ok']
        });
        alert.present();
        this.navCtr.setRoot(HomePage);

      },
      (error)=>{
        console .log(error);
        loading .dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.json().message,
          buttons: ['Ok']
        });
        alert.present();
      }
    );

  }
}
