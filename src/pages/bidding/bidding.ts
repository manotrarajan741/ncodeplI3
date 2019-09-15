import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { PlayerinfoPage } from '../playerinfo/playerinfo';


@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class BiddingPage { 
 
isNetwork:any;
notfound:any;
notfound1:any;
msg:any;
allbiddingmsg:any
resultData:any;
resultData1:any;
page:any;
done=true;
livebidding=[];
allbidding=[]; 
timer='';
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
    console.log('ionViewDidLoad BiddingPage');
	this.getLiveBiddingData();
	
  }
 ionViewWillLeave() {
  clearTimeout(this.timer);
   }  
  getLiveBiddingData(){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getLiveBiddingData()
		.subscribe(
			data => {
			this.resultData = data
			
				if(this.resultData.flag == true)
				 {
				
				  this.livebidding = this.resultData.data[0];
				   this.notfound=0;
				   loader.dismiss();
				 }
				 else{
				   this.notfound=1;
				   this.livebidding=[];
				   this.msg=this.resultData.msg
				   loader.dismiss();
				 } 
				this.getAllBiddingData(); 
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			}
		)
  }
   
  
 

 getAllBiddingData(){  
		
     this.done=true;
     this.page = 1;
  		this.myservice.getAllBiddingData(this.page)
		.subscribe(
			data => {
			this.resultData1 = data
			
			 if(this.resultData1.flag == true)
				 {
			         
					 this.allbidding=[];
				     this.allbidding = this.resultData1.data;
					 this.notfound1=0;
					 
					 
					  if(this.resultData1.nextpage == '0'){
    					  this.done = false;
    				   }else{
    					  this.page = this.resultData1.nextpage; 
    				   } 
					
					if(this.livebidding!=0)
					{
					 
					  	if(this.timer!='')
							{
							clearTimeout(this.timer);
							this.timer='';
							
							}
				       this.timer = setTimeout(() => {
					     this.getLiveBiddingData();
					  }, this.resultData1.time);
					  
					}
				  }
			else{
			       this.notfound1=1; 
				   this.done=false;
  		           this.allbiddingmsg = this.resultData1.msg;
			  }	
			
			},
			error => {
			  console.log(error.json())
			 
			}
		)
  }
  
  
  
  
  
  
  
  loadMoreData(){ 
		
    if(this.page!=1){
			this.myservice.getAllBiddingData(this.page)
			.subscribe(
				data => {
				this.resultData1 = data
				
				 if(this.resultData1.flag == true)
					 {
						  this.allbidding = this.allbidding.concat(this.resultData1.data);
						  if(this.resultData1.nextpage==0){
							   this.done=false;
						  }else{
							  this.page = this.resultData1.nextpage;
						  }	
					}
				  else{
					   this.done=false;
				    }	
				},
				error => {
				  console.log(error.json())
				  
				}
			)
  
    }
	else{
  
    }
  }
  
   doInfinite(infiniteScroll) {
	 
	 setTimeout(() => {
		 this.loadMoreData();
		  infiniteScroll.complete();
		}, 2000);

          
   }
  
   moreDataCanBeLoaded (){
		//console.log(this.done)
		return this.done;
		
	}
  
  
 refresh_bid (){
   this.getLiveBiddingData();
  }
  
  
  
   godetail(id)
  {
   this.navCtrl.push(PlayerinfoPage, { id: id, redirct: 'playerinfo'});
  }
}