import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';



@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {

isNetwork:any;

  constructor(public navCtrl: NavController, private menu: MenuController, public navParams: NavParams, private iab: InAppBrowser, private network: Network) {
 	 console.log("Network Type : "+this.network.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
	
  }
  
 
}