import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController } from 'ionic-angular';
import { LivetvPage } from '../livetv/livetv';
import { PlayerinfoPage } from '../playerinfo/playerinfo';
import { ScoreboardPage } from '../scoreboard/scoreboard';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'page-livescroe',
	templateUrl: 'livescroe.html'
})
export class LivescroePage {
	isNetwork: any;
	resultData: any;
	msg: any;
	main_sponsor: any;
	gameloader: any;
	result: any = [];
	gameoverball: any = [];
	lastball: any = [];
	previousball: any;
	curseries: any;
	live: any;
	lastyoutubelink: any;
	livefullurl: any;
	actualyoutubelink: any;
	watch = 0;
	showtv = 0;
	cheergirls = 0;
	previousarraylength: any;
	livescroetimer: any;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private myservice: ServiceProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public sanitizer: DomSanitizer) {


		//this.getlivescore();
		this.curseries = window.localStorage.getItem("title");;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LivescroePage');
		this.getsponsorinfo();
		this.getlivescore();
		this.getyoutubeid();
		//this.fbvideo();
	}

	//   fbvideo(){
	//  	(function(d, s, id) {
	//  		var js, fjs = d.getElementsByTagName(s)[0];
	//  		if (d.getElementById(id)) return;
	//  		js = d.createElement(s); js.id = id;
	//  		js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2&appId=714004705472024&autoLogAppEvents=1';
	//  		fjs.parentNode.insertBefore(js, fjs);
	//  	  }(document, 'script', 'facebook-jssdk'));
	//   }
	ionViewWillLeave() {
		clearTimeout(this.livescroetimer);
	}

	refreshservice() {
		this.getyoutubeid();
		this.showtv = 0;
	}
	getyoutubeid() {
		this.myservice.getyoutubeid()
			.subscribe(
				data => {
					this.getlivescore();
				},
				error => {
					console.log(error.json())
				}
			)
	}

	getlivescore() {
		this.gameloader = true;

		this.myservice.getlivescore()
			.subscribe(
				data => {
					clearTimeout(this.livescroetimer);
					this.result = [];
					this.gameoverball = [];
					this.resultData = data;
					this.actualyoutubelink = this.resultData.actualurl;
					this.lastyoutubelink = window.localStorage.getItem("lastyoutubelink");

					if (this.lastyoutubelink != this.resultData.livefullurl) {
						this.showtv = 0;
					}

					if (this.showtv == 0 && this.resultData.livestream == true) {
						this.livefullurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resultData.livefullurl);
					}
					else {
						this.livefullurl = '';
					}

					if (this.resultData.livestream == true) {
						this.showtv = 1;
					} else {
						this.showtv = 0;
					}

					window.localStorage.setItem("lastyoutubelink", this.resultData.livefullurl);

					if (this.resultData.cnt == 1) {
						this.result.push(this.resultData);
						this.gameoverball.push(this.resultData.overball);

						this.lastball = [];
						this.lastball.push(this.resultData.overball[this.resultData.overball.length - 1]);
						this.previousball = this.lastball[0].key;
						this.previousarraylength = this.lastball.length;
						if (this.cheergirls != this.resultData.overball.length) {
							if (this.previousball == '4' || '6' || 'w') {
								this.watch = 1;
								this.cheergirls = this.resultData.overball.length;
								setTimeout(() => {
									this.watch = 0;
								}, 3000);
							}
						}
						this.gameloader = false;
						this.livescroetimer = setTimeout(() => {
							this.getlivescore();
						}, this.resultData.time_refresh);
						this.live = 1;
					}

					else {
						this.msg = this.resultData.message;
						this.result.push(this.resultData);
						this.gameoverball.push(this.resultData.overball);
						this.gameloader = false;

						this.livescroetimer = setTimeout(() => {
							this.getlivescore();
						}, this.resultData.time_refresh);
						this.live = 0;
					}
					this.getsponsorinfo();
				},
				error => {
					console.log(error.json())
				}
			)
	}

	livetv() {
		this.navCtrl.push(LivetvPage, { redirct: 'livetv' });
	}

	godetail(id) {
		this.navCtrl.push(PlayerinfoPage, { id: id, redirct: 'playerinfo' });
	}

	godetailfullscore(id) {
		this.navCtrl.push(ScoreboardPage, { id: id, redirct: 'scoreboard' });
	}

	doRefresh(refresher) {
		setTimeout(() => {
			this.showtv = 0;
			refresher.complete();
			clearTimeout(this.livescroetimer);
			this.getlivescore();
			this.gameloader = true;
			this.getsponsorinfo();
		}, 1000);
	}

	getsponsorinfo() {

		this.myservice.getsponsorinfo()
			.subscribe(
				data => {
					this.resultData = data
					this.main_sponsor = this.resultData.main_sponsor;
				},
				error => {
					console.log(error.json())
				}
			)
	}

	goyoutube() {
		window.open('' + this.actualyoutubelink + '', '_system');
	}


}
