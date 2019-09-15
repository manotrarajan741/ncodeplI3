import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';



@Component({
  selector: 'page-developedby',
  templateUrl: 'developedby.html',
})
export class DevelopedbyPage {

isNetwork:any;

  constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams, 
			  private iab: InAppBrowser, 
			  private network: Network) {
				 console.log("Network Type : "+this.network.type);
			  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevelopedbyPage');
	this.opensite();
  }
  
  opensite(){
	if(this.network.type == 'none')
	{
	     this.isNetwork = false;
	}
	else{
		this.isNetwork = true;
		const browser = this.iab.create('http://www.vthinksolution.com/devcontact.html','_blank',{location:'yes'});
	}
  }  
}