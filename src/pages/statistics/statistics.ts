import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import { MostrunPage } from './mostrun/mostrun';
import { MostwicketPage } from './mostwicket/mostwicket';
import { MostfiftiesPage } from './mostfifties/mostfifties'; 
import { MosthundredPage } from './mosthundred/mosthundred';
import { MostfourPage } from './mostfour/mostfour';
import { MostsixesPage } from './mostsixes/mostsixes';
import { MostindscorePage } from './mostindscore/mostindscore'; 
import { MostbollingPage } from './mostbolling/mostbolling';     

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
isNetwork:any;
resultData:any;
result:any;

mostruns_name:any;
mostruns_total:any;
mostruns_team_name:any;

mostwickets_name:any;
mostwickets_wicket_player:any;
mostwickets_team_name:any;

mostfifties_name:any;
mostfifties_fifties:any;
mostfifties_team_name:any;

mosthundreds_name:any;
mosthundreds_hundreds:any;
mosthundreds_team_name:any;

mostfours_name:any;
mostfours_total:any;
mostfours_team_name:any;

mostsixes_name:any;
mostsixes_total:any;
mostsixes_team_name:any;

mostindscore_name:any;
mostindscore_total:any;
mostindscore_team_name:any;

mostobfigures_name:any;
mostobfigures_player_wicket:any;
mostobfigures_team_name:any;

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
    console.log('ionViewDidLoad StatisticsPage');
	this.getmostruns();
	this.getmostwickets();
	this.getmostfifties();
	this.getmosthundreds(); 
	this.getmostfours();
	this.getmostsixes();
	this.getmostindscore();
	this.getmostobfigures();
	}
	

  /*******************************Most Runs*************************/ 
 getmostruns(){
		this.myservice.getmostruns()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				 if(this.resultData.data.length > 0)
				   {
				     this.mostruns_name = this.resultData.data[0].name;
				     this.mostruns_total = this.resultData.data[0].total;
				     this.mostruns_team_name = this.resultData.data[0].team_name;
				  }
				 else{
				     this.mostruns_name='';
					 this.mostruns_total='';
					 this.mostruns_team_name='';
				   }
				  } 
				   
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Runs*************************/
  
  
   gomostruns()
  {
   this.navCtrl.push(MostrunPage, { redirct: 'mostrun'});
  }
  
  
 /*******************************Most Wickets*************************/ 
  getmostwickets(){
		this.myservice.getmostwickets()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				 if(this.resultData.data.length > 0)
				   {
				  this.mostwickets_name = this.resultData.data[0].name;
				  this.mostwickets_wicket_player = this.resultData.data[0].wicket_player;
				  this.mostwickets_team_name = this.resultData.data[0].team_name;
				  }
				 else{
				     this.mostwickets_name='';
					 this.mostwickets_wicket_player='';
					 this.mostwickets_team_name='';
				   }
				 }  
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Wickets*************************/ 
   gomostwickets()
  {
   this.navCtrl.push(MostwicketPage, { redirct: 'mostwicket'});
  }
  
  
 /*******************************Most Fifties*************************/ 
  getmostfifties(){
		this.myservice.getmostfifties()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				 if(this.resultData.data.length > 0)
				   {
				  this.mostfifties_name = this.resultData.data[0].name;
				  this.mostfifties_fifties = this.resultData.data[0].fifties;
				  this.mostfifties_team_name = this.resultData.data[0].team_name;
				 }
				 else{
				     this.mostfifties_name='';
					 this.mostfifties_fifties='';
					 this.mostfifties_team_name='';
				   }
				  } 
			},    
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Fifties*************************/  
  
  gomostfiftiess()
  {
   this.navCtrl.push(MostfiftiesPage, { redirct: 'mostfifties'});
  }
  
  /*******************************Most Hundreds*************************/ 
  getmosthundreds(){
		this.myservice.getmosthundreds()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				   if(this.resultData.data.length > 0)
				   {
				   
				    this.mosthundreds_name = this.resultData.data[0].name;
				    this.mosthundreds_hundreds = this.resultData.data[0].hundred;
				    this.mosthundreds_team_name = this.resultData.data[0].team_name;
				   }
				   else{
				     this.mosthundreds_name='';
					 this.mosthundreds_hundreds='';
					 this.mosthundreds_team_name='';
				   }
				 }
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Hundreds*************************/ 
  
   gomosthundreds()
  {
   this.navCtrl.push(MosthundredPage, { redirct: 'mosthundred'});
  }
  
  /*******************************Most Fours*************************/ 
  getmostfours(){
		this.myservice.getmostfours()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				   if(this.resultData.data.length > 0)
				   {
				   
				    this.mostfours_name = this.resultData.data[0].name;
				    this.mostfours_total = this.resultData.data[0].total;
				    this.mostfours_team_name = this.resultData.data[0].team_name;
				   }
				   else{
				     this.mostfours_name='';
					 this.mostfours_total='';
					 this.mostfours_team_name='';
				   }
				 }
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Fours*************************/
  
   gomostfour()
  {
   this.navCtrl.push(MostfourPage, { redirct: 'mostfour'});
  }
  
  /*******************************Most Sixes*************************/ 
  getmostsixes(){
		this.myservice.getmostsixes()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				   if(this.resultData.data.length > 0)
				   {
				   
				    this.mostsixes_name = this.resultData.data[0].name;
				    this.mostsixes_total = this.resultData.data[0].total;
				    this.mostsixes_team_name = this.resultData.data[0].team_name;
				   }
				   else{
				     this.mostsixes_name='';
					 this.mostsixes_total='';
					 this.mostsixes_team_name='';
				   }
				 }
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Sixes*************************/ 
  gomostsixes()
  {
   this.navCtrl.push(MostsixesPage, { redirct: 'mostsixes'});
  }
  
  /*******************************Most Indscore*************************/ 
  getmostindscore(){
		this.myservice.getmostindscore()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				   if(this.resultData.data.length > 0)
				   {
				   
				    this.mostindscore_name = this.resultData.data[0].name;
				    this.mostindscore_total = this.resultData.data[0].total;
				    this.mostindscore_team_name = this.resultData.data[0].team_name;
				   }
				   else{
				     this.mostindscore_name='';
					 this.mostindscore_total='';
					 this.mostindscore_team_name='';
				   }
				 }
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Indscore*************************/ 
  
    gomostindscore()
  {
   this.navCtrl.push(MostindscorePage, { redirct: 'mostindscore'});
  }
  /*******************************Most Obfigures*************************/ 
  getmostobfigures(){
		this.myservice.getmostobfigures()
		.subscribe(
			data => {
			     this.resultData = data
				 if(this.resultData.flag == true)
				 {
				   if(this.resultData.data.length > 0)
				   {
				   
				    this.mostobfigures_name = this.resultData.data[0].name;
				    this.mostobfigures_player_wicket = this.resultData.data[0].player_wicket;
				    this.mostobfigures_team_name = this.resultData.data[0].team_name;
				   }
				   else{
				     this.mostobfigures_name='';
					 this.mostobfigures_player_wicket='';
					 this.mostobfigures_team_name='';
				   }
				 }
			},
			error => {
			  console.log(error.json())
			}
		)
  }
  /*******************************Most Obfigures*************************/ 
  gomostbolling()
  {
   this.navCtrl.push(MostbollingPage, { redirct: 'mostbolling'});
  }
}