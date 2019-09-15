import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';



@Component({
  selector: 'page-sponsor-detail',
  templateUrl: 'sponsor-detail.html'

})
export class SponsorDetailPage {
isNetwork:any;
 name:any;
 company:any;
 sponsor_type:any;
 address:any;
 mobile:any;
 website:any;
 email:any;
 img:any;
 resultData:any;

  constructor(public navCtrl: NavController, 
        public navParams: NavParams,
  	  	private network: Network,
  		private myservice: ServiceProvider,
		public loadingCtrl: LoadingController,
		) { 
	let id = navParams.get('id');
    this.getsponsordetails(id)
  }
  
   ionViewDidLoad() {
    console.log('ionViewDidLoad SponsorDetailPage'); 
  }

  getsponsordetails(id){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getsponsordetails(id)
		.subscribe(
			data => {
			this.resultData = data
			this.name=this.resultData.data.name;
			this.company=this.resultData.data.company;
			this.sponsor_type=this.resultData.data.sponsor_type;
			this.img=this.resultData.data.img;
			
			this.address=this.resultData.data.address;
			this.mobile=this.resultData.data.mobile;
			this.website=this.resultData.data.website;
			this.email=this.resultData.data.email;
			
		
			loader.dismiss();
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			  
			}
		)
  }
}
 