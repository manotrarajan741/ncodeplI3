import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../../providers/service/service';
import { PlayerinfoPage } from '../../playerinfo/playerinfo';


@Component({
  selector: 'page-mosthundred',
  templateUrl: 'mosthundred.html',
})
export class MosthundredPage { 

isNetwork:any;
notfound:any;
resultData:any;
mosthundred:any;
  constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private network: Network,
			  private myservice: ServiceProvider,) {
 	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosthundredPage');
	this.getmosthundreds()
  }
  
  
  getmosthundreds(){
		this.myservice.getmosthundreds()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
					 if(this.resultData.data.length > 0){
						 this.mosthundred = this.resultData.data;
						 this.notfound=0;
					   }  	 
					 else{
						this.notfound=1;
						} 
				  }
			},
			error => {
			  console.log(error.json())
			}
		)
	}
	
  godetail(id)
  {
   this.navCtrl.push(PlayerinfoPage, { id: id, redirct: 'playerinfo'});
  }
}