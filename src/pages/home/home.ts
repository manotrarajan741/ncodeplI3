import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
resultData:any;
sponsorurl:any;
title:any;
sponsorwebsite: any;
sponsorimageheight: any;

  constructor(public navCtrl: NavController, 
              private menu: MenuController,
              platform: Platform,
              private myservice: ServiceProvider) {
			  window.localStorage.removeItem("series");
        window.localStorage.removeItem("title");
        
        platform.ready().then(() => {
          this.sponsorimageheight = platform.height() - 155+"px";
        });
 }

  ionViewDidEnter() {
    this.menu.swipeEnable(false); 
  }
 ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
	this.getsponsorinfo();
    this.title='Application-Sponser';
  }
  
  getsponsorinfo(){
		
  		this.myservice.getsponsorinfo()
		.subscribe(
			data => {
			this.resultData = data
			
			this.sponsorurl=this.resultData.sponsorurl;
      this.title=	this.resultData.title;
      this.sponsorwebsite = this.resultData.sponsorwebsite;
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  
   
 godashboard(){
   this.navCtrl.setRoot(DashboardPage);
 } 

 gosponsorwebsite(sponsorwebsite){
  window.open(''+sponsorwebsite+'');
}
  
}
