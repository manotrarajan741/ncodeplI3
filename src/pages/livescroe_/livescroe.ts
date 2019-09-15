import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { LivetvPage } from '../livetv/livetv';  
import { PlayerinfoPage } from '../playerinfo/playerinfo';
import { ScoreboardPage } from '../scoreboard/scoreboard';

@Component({
  selector: 'page-livescroe',
  templateUrl: 'livescroe.html'
})
export class LivescroePage {
isNetwork:any;
resultData:any;
msg:any;
main_sponsor:any;
gameloader:any;
result:any = [];
gameoverball:any = []; 
curseries:any;
live:any;
livescroetimer='';
  constructor(public navCtrl: NavController, 
				  private menu: MenuController, 
				  public navParams: NavParams,
				  private network: Network,
				  private myservice: ServiceProvider,
				  public alertCtrl: AlertController,
				  public loadingCtrl: LoadingController) {

			
			this.getlivescore();
			this.curseries = window.localStorage.getItem("title");;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LivescroePage');
	this.getsponsorinfo();
	this.getlivescore();
  }
  ionViewWillLeave() {
  clearTimeout(this.livescroetimer);
   }
  
  getlivescore(){
  	    this.gameloader = true;
     
  		this.myservice.getlivescore()
		.subscribe(
			data => {
			    clearTimeout(this.livescroetimer);
			    this.result = [];
	            this.gameoverball = [];
				this.resultData = data;
				
				
				if(this.resultData.cnt == 1)
				{
				this.result.push(this.resultData);
				this.gameoverball.push(this.resultData.overball);
				this.gameloader = false;
				 this.livescroetimer=setTimeout(() => {
							 this.getlivescore();
					}, this.resultData.time_refresh);
				this.live=1;
				}
				
				else{
				this.msg=this.resultData.message;
				this.result.push(this.resultData);
				this.gameoverball.push(this.resultData.overball);
				this.gameloader = false;
				
				this.livescroetimer=setTimeout(() => {
							 this.getlivescore();
					}, this.resultData.time_refresh);
				this.live=0;
				}
				 this. getsponsorinfo();
			},
			error => { 
			  console.log(error.json())
			}
		)
  }
                   
 livetv(){ 
    this.navCtrl.push(LivetvPage, { redirct: 'livetv'});
  }  
  
  godetail(id)
  {
   this.navCtrl.push(PlayerinfoPage, { id: id, redirct: 'playerinfo'});
  } 
  
  godetailfullscore(id) 
  {
   this.navCtrl.push(ScoreboardPage, { id: id, redirct: 'scoreboard'});
  }
  
  
   doRefresh(refresher) {
    setTimeout(() => {
       refresher.complete();
	   clearTimeout(this.livescroetimer);
	   this.getlivescore()
	   this.gameloader = true;
	   this. getsponsorinfo();
    }, 1000);
  }
 
 
 
 
 getsponsorinfo(){
		
  		this.myservice.getsponsorinfo()
		.subscribe(
			data => {
			this.resultData = data
			this.main_sponsor=this.resultData.main_sponsor;
			},
			error => {
			  console.log(error.json())
			}
		)
  }
 
  
}
