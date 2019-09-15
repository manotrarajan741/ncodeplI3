import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { PlayerinfoPage } from '../../playerinfo/playerinfo';


@Component({
  selector: 'page-teams-detail',
  templateUrl: 'teams-detail.html'

})
export class TeamsdetailPage { 
isNetwork:any;
resultData:any;
result:any;
	 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	  	private network: Network,
  		private myservice: ServiceProvider,
		public loadingCtrl: LoadingController,
		) { 
	let id = navParams.get('id');
	this.getteamsdetails(id); 
  } 
  
   ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsdetailPage');
  }

  getteamsdetails(id){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getteamsdetails(id) 
		.subscribe(
			data => {
			this.resultData = data
				if(this.resultData.flag == true)
				 {
				  this.result = this.resultData.data;
				  loader.dismiss();
				 }
				 else{
				 loader.dismiss();
				 } 
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
 