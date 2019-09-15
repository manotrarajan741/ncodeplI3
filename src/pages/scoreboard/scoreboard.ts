import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { PlayerinfoPage } from '../playerinfo/playerinfo';

@Component({
  selector: 'page-scoreboard',
  templateUrl: 'scoreboard.html',
})
export class ScoreboardPage {

scorecard:any[] = [];
isNetwork:any;
I1:any[] = [];
I2:any[] = [];

 constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private network: Network,
			  private myservice: ServiceProvider,
			  public alertCtrl: AlertController,
			  public loadingCtrl: LoadingController) {
 	 
	 let id = navParams.get('id');
	 this.getdata(id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoreboardPage');
  }
getdata(id){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getdata(id)
		.subscribe(
			data => {
			this.scorecard = data;
			this.I1=data.inning1_extra;
			this.I2=data.inning2_extra;
			loader.dismiss();
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			  
			}
		)
  }

	
  godetail(id)
  {
   this.navCtrl.push(PlayerinfoPage, { id: id, redirct: 'playerinfo'});
  }
  
}
