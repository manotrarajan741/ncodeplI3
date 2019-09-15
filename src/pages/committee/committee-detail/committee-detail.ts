import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';



@Component({
  selector: 'page-committee-detail',
  templateUrl: 'committee-detail.html'

})
export class CommitteeDetailPage {
isNetwork:any;
 name:any;
 fathername:any;
 surname:any;
 mobile:any;
 dob:any;
 age:any
 img:any;
 resultData:any;  
	
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	  	private network: Network,
  		private myservice: ServiceProvider,
		public loadingCtrl: LoadingController,
		) { 
	let id = navParams.get('id');
	this.getCommitteedetails(id)
  }
  
   ionViewDidLoad() {
    console.log('ionViewDidLoad CommitteeDetailPage');
  }

  getCommitteedetails(id){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getCommitteedetails(id)
		.subscribe(
			data => {
			this.resultData = data;
			this.name=this.resultData.data[0].name;
			this.fathername=this.resultData.data[0].fathername;
			this.surname=this.resultData.data[0].surname;
			this.dob=this.resultData.data[0].dob;
			this.age=this.resultData.data[0].age;
			this.mobile=this.resultData.data[0].mobile;
			this.img=this.resultData.data[0].img;
			
			loader.dismiss();
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			  
			}
		)
  }
}
 