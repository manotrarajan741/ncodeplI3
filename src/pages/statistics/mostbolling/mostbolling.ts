import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../../providers/service/service';
import { PlayerinfoPage } from '../../playerinfo/playerinfo';

@Component({
  selector: 'page-mostbolling',
  templateUrl: 'mostbolling.html',
})
export class MostbollingPage {

isNetwork:any;
notfound:any;
resultData:any;
mostbolling:any;
  constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private network: Network,
			  private myservice: ServiceProvider,) {
 	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostbollingPage');
	this.getmostobfigures()
  }
  
  
  getmostobfigures(){
		this.myservice.getmostobfigures()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
					 if(this.resultData.data.length > 0){
						 this.mostbolling = this.resultData.data;
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