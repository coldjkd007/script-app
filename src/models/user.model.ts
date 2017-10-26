
export class User {


  constructor( public userId: string,
               public firstName: string,
               public lastName: string,
               public address: string,
               public state: string,
               public zipCode: number,
               public phoneNo: number,
               public email: string,
               public isReceiveEmailNotification: boolean,
               public userType: string,
               public password: string){}
}
