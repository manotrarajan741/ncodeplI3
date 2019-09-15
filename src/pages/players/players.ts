import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { PlayerinfoPage } from '../playerinfo/playerinfo';


@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class PlayersPage { 

isNetwork:any;
resultData:any;

result:any[]=[];
searchFlag: boolean = false;

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
	this.getPlayers();
  }
   
  getPlayers(){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getPlayers()
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
  
  getItems(ev: any) {
    
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.result = this.result.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.fathername.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.surname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
		}else{
			this.getPlayers();
		}

	}
	onSearch(){
		this.searchFlag=true;
	}
}