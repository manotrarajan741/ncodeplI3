import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';


 
@Component({
  selector: 'page-playerinfo',
  templateUrl: 'playerinfo.html',
})
export class PlayerinfoPage { 

isNetwork:any;
resultData:any;
result=[];
bioFlag : boolean = true;
battingFlag: boolean = false;
bowlingFlag:boolean = false;
  constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private iab: InAppBrowser, 
			  private network: Network,
			  private myservice: ServiceProvider,
			  public alertCtrl: AlertController,
	          public loadingCtrl: LoadingController) {
  
    let id = navParams.get('id'); 
	this.getplayerinfo(id);
    this.bioFlag = true;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerinfoPage');
	
  }
  ionViewWillEnter(){
    
  }	 
  getplayerinfo(id){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getplayerinfo(id)
		.subscribe(
			data => {
			 this.result = data; 
				loader.dismiss(); 
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			}
		)
  }
 
 segmentChanged(event:any){
   
    if(event.value == "bio"){
      this.battingFlag = false;
      this.bowlingFlag = false;
      this.bioFlag = true;
    }
    else if(event.value == "batting"){
      this.bioFlag = false;
      this.bowlingFlag = false;
      this.battingFlag= true;
    }
    else if(event.value == "bowling"){
      this.bioFlag = false;
      this.battingFlag = false;
      this.bowlingFlag = true;
    }
  }
}