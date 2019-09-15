import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { ScoreboardPage } from '../scoreboard/scoreboard';



@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

isNetwork:any;
resultData:any;
result:any;
notfound:any;
schedulemsg:any;

   constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private network: Network,
			  private myservice: ServiceProvider,
			  public alertCtrl: AlertController,
			  public loadingCtrl: LoadingController) {
 	 
	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
	this.getschedule();
  }
  
 getschedule(){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getschedule()
		.subscribe(
			data => {
			this.resultData = data
				if(this.resultData.flag == true)
				 {
				  this.result = this.resultData.data;
				  loader.dismiss();
				   this.notfound=0;
				 }
				 else{
				 this.schedulemsg=this.resultData.msg
				 loader.dismiss();
				 this.notfound=1;
				 } 
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			}
		)
  }
	

	
   godetail(id,status) 
  {
    if(status == 'complete')
    {
     this.navCtrl.push(ScoreboardPage, { id: id, redirct: 'scoreboard'});
    }
  }
}