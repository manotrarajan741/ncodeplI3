import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { CommitteeDetailPage } from './committee-detail/committee-detail';


@Component({
  selector: 'page-committee',
  templateUrl: 'committee.html',
})
export class CommitteePage { 

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
    console.log('ionViewDidLoad CommitteePage');
	this.getCommittee();
  }
   
  getCommittee(){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getCommittee()
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
   this.navCtrl.push(CommitteeDetailPage, { id: id, redirct: 'committee-detail'});
  }
  
}