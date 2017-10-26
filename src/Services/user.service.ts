
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  public user:User;

  // Observable navItem source
  private _navItemSource = new BehaviorSubject<User>(this.user);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();

  constructor(private http:Http){}


  changeUser(user) {
    this._navItemSource.next(user);
    this.user=user;
    console.log(this.user);
  }

  logout(){
    this._navItemSource.next(undefined);
    this.user=undefined;
  }

  registerUser(user: User){
    return this.http.post('http://192.168.1.136:8080/scriptserver/webapi/users',user);
  }

  getUserList(){
    return this.http.get('http://192.168.1.136:8080/scriptserver/webapi/users/list');
  }

  getUserWithEmail(email:string){
    return this.http.get('http://192.168.1.136:8080/scriptserver/webapi/users/email/'+email);
  }

  getUserWithEmailPass(email:string,password:string){
    return this.http.get('http://192.168.1.136:8080/scriptserver/webapi/users/email/'+email+'/'+password);
  }

}
