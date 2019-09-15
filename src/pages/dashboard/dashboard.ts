import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AlertController, LoadingController} from 'ionic-angular';
import { LivescroePage } from '../livescroe/livescroe';
import { ServiceProvider } from '../../providers/service/service';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
resultData:any;

company_title:any;
company_phone:any;
company_url:any;
series_info:any;
isNetwork:any;
tryagain:any;
  constructor(public navCtrl: NavController, 
              private menu: MenuController,
			  private myservice: ServiceProvider,
			  private network: Network,
			  public alertCtrl: AlertController,
			 public loadingCtrl: LoadingController) {
    
	 console.log("Network Type : "+this.network.type);
	  window.localStorage.removeItem("series");
      window.localStorage.removeItem("title");
  }
 ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
 ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

	            if(this.network.type == 'none')
				{ 
					this.opensite()	;
				}
				else
				{
					this.getsponsorinfo();
				}
	
    this.company_title='V Think Solution';
	this.company_phone='9898159666';
	this.company_url='http://www.vthinksolution.com/';
  }
  
   opensite(){

				if(this.network.type == 'none')
				{
						this.isNetwork = false;
					
							let alert = this.alertCtrl.create({
							title: 'Alert!',
							subTitle: 'Please check your internet connection. Looks like it is turned off or low connectivity.',
							buttons: ['OK'] 
						});
						alert.present();
						this.tryagain=1;
					
				}
				else{
				
					this.isNetwork = true;
					this.getsponsorinfo(); 
					this.tryagain=0;
				}
  }
  
  
  getsponsorinfo(){
	let loader = this.loadingCtrl.create({
		content: "Please wait...",
	  });
	  loader.present();
		
  		this.myservice.getsponsorinfo()
		.subscribe(
			data => {
			this.resultData = data
			
			this.company_title=this.resultData.company_title;
			this.company_phone=	this.resultData.company_phone;
			this.company_url=	this.resultData.company_url;
			this.series_info=	this.resultData.data;
			loader.dismiss();
			
			},
			error => {
				console.log(error.json());
				let alert = this.alertCtrl.create({
					title: 'Alert!',
					subTitle: 'Please check your internet connection. Looks like it is turned off or low connectivity.',
					buttons: ['OK'] 
				});
				alert.present();
				this.tryagain=1;
		        loader.dismiss();
			}
		)
  }
  
  
 golivescroe(series,title){ 

   window.localStorage.setItem("series", series);
    window.localStorage.setItem("title", title);
    setTimeout( () => {
       this.navCtrl.setRoot(LivescroePage);
    }, 500);
   
 
 }  
  
  
  
}
