import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { SponsorDetailPage } from './sponsor-detail/sponsor-detail'; 

 
@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html',
})
export class SponsorPage { 

isNetwork:any;
resultData:any;
result:any;
  constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private iab: InAppBrowser, 
			  private network: Network,
			  private myservice: ServiceProvider,
			  public alertCtrl: AlertController,
	          public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad SponsorPage');
	this.getsponsor();
  }
   
  getsponsor(){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getsponsor()
		.subscribe(
			data => {
			this.resultData = data;
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
   this.navCtrl.push(SponsorDetailPage, { id: id, redirct: 'sponsor-detail'});
  }
  
}