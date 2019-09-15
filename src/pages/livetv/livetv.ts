import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-livetv',
  templateUrl: 'livetv.html'
})
export class LivetvPage {
isNetwork:any;
resultData:any;
series:any;
result:any = [];
gameoverball:any = [];
livefullurl:any;
  constructor(public navCtrl: NavController, 
				  private menu: MenuController, 
				  public navParams: NavParams,
				  private network: Network,
				  private myservice: ServiceProvider,
				  public alertCtrl: AlertController,
				  public loadingCtrl: LoadingController,
				  public sanitizer: DomSanitizer) {

			//let series = navParams.get('series');
			this.getlivescore();
			//this.curseries = series;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LivetvPage');
  }
  
  getlivescore(){
  	this.result = [];
	this.gameoverball = [];
		let loader = this.loadingCtrl.create({ 
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getlivescore()
		.subscribe(
			data => {
				this.resultData = data;
				this.livefullurl=this.sanitizer.bypassSecurityTrustResourceUrl(this.resultData.livefullurl)
				
				//this.sanitizer.bypassSecurityTrustResourceUrl(url);	
				/*this.result.push(this.resultData);
				this.gameoverball.push(this.resultData.overball);*/
				loader.dismiss();
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			}
		)
  }
 
   
}
