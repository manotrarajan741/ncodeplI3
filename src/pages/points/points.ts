import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {
  pointsdata=[];
  pointsmsg: boolean;
  constructor(public navCtrl: NavController,
    private myservice: ServiceProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getdata();
   // console.log('ionViewDidLoad PointsPage');
  }
  getdata() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.myservice.getpoints()
      .subscribe(
        data => {
          if(data.flag == true){
            this.pointsdata = data.data;
            loader.dismiss();
          }else{
            this.pointsmsg = data.flag
          }
   
        },
        error => {
          console.log(error.json())
          loader.dismiss();

        }
      )
  }


	

}
