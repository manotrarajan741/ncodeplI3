import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FCM } from '@ionic-native/fcm';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ServiceProvider } from '../providers/service/service';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LivescroePage } from '../pages/livescroe/livescroe';
import { PlayersPage } from '../pages/players/players';
import { SchedulePage } from '../pages/schedule/schedule';
import { MatchesPage } from '../pages/matches/matches';
import { TeamsPage } from '../pages/teams/teams';
import { StatisticsPage } from '../pages/statistics/statistics';
import { PointsPage } from '../pages/points/points';
import { BiddingPage } from '../pages/bidding/bidding';
import { SponsorPage } from '../pages/sponsor/sponsor';
import { CommitteePage } from '../pages/committee/committee';
import { GalleryPage } from '../pages/gallery/gallery';
import { SelfiePage } from '../pages/selfie/selfie';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { DevelopedbyPage } from '../pages/developedby/developedby';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;//HomePage;  

	colorprivacy = 'light';
	colordevelopedby = 'light';
	coloraboutus = 'light';
	colorothergames = 'light';
	colorevents = 'light';
	colorregistration = 'light';
	colorlive = 'light';
	colorstrawpoll = 'light';
	device_id: any;

	resultData: any;
	currentseries: any;
	result: any;
	framelist: any = [];
	count = 0;
	pages: Array<{ title: string, icon: string, component: any, color: any }>;



	constructor(public platform: Platform,
		public events: Events,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		private iab: InAppBrowser,
		private fcm: FCM,
		private menu: MenuController,
		private myservice: ServiceProvider,
		private androidPermissions: AndroidPermissions) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Players', icon: 'people', component: PlayersPage, color: 'light' },
			{ title: 'Matches', icon: 'calendar', component: MatchesPage, color: 'light' },
			{ title: 'Schedule', icon: 'list', component: SchedulePage, color: 'light' },
			{ title: 'Teams', icon: 'shirt', component: TeamsPage, color: 'light' },
			{ title: 'Statistic', icon: 'photos', component: StatisticsPage, color: 'light' },
			{ title: 'Points', icon: 'folder', component: PointsPage, color: 'light' },
			{ title: 'Bidding', icon: 'film', component: BiddingPage, color: 'light' },
			{ title: 'Sponsors', icon: 'card', component: SponsorPage, color: 'light' },
			{ title: 'Committee', icon: 'contacts', component: CommitteePage, color: 'light' },
			{ title: 'Gallery', icon: 'image', component: GalleryPage, color: 'light' },
			{ title: 'Selfie', icon: 'logo-instagram', component: SelfiePage, color: 'light' },

		];


		/*	this.framelist = [
			{ title: 'frame1', framename: 'http://nplcric.in/admin/upload/frame/frame (1).png' },
			{ title: 'frame1', framename: 'http://nplcric.in/admin/upload/frame/frame (2).png' },
			{ title: 'frame1', framename: 'assets/selfie/1.png' },
		   ];*/

		this.myservice.getimage()
			.subscribe(
				data => {
					this.framelist = data.data;
				},
				error => {
					console.log(error.json())
				}
			)

		this.fcm.getToken().then(token => {
			console.log(token)
			this.device_id = token

			this.myservice.register(this.device_id)
				.subscribe(
					data => {
						this.resultData = data;
						console.log(this.resultData.msg)
					},
					error => {
						console.log(error.json())
					}
				)
		});

		events.subscribe('user:dashboard', () => {
			this.myservice.getimage()
				.subscribe(
					data => {
						this.framelist = data.data;
					},
					error => {
						console.log(error.json())
					}
				) 
		});
	}
 
	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.menu.swipeEnable(false, 'rightside');
		});


		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
			result => console.log('Has permission?', result.hasPermission),
			err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
		);

		this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);

	}

	selectFrame(imagepath) {
		console.log(imagepath);
		this.events.publish('user:created', imagepath, Date.now());
		this.menu.close();
	}

	openPage(page) {
		this.nav.setRoot(page.component);
		page.color = 'danger';
		this.coloraboutus = 'danglighter';
		this.colordevelopedby = 'light';
		this.colorprivacy = 'light';
		this.colorevents = 'light';
		this.colorstrawpoll = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) {

			if (p.title == page.title) {
				p.color = 'danger';
			}
			else {
				p.color = 'light';
			}

		}
	}

	live() {
		this.nav.setRoot(LivescroePage);
		this.colorevents = 'light';
		this.colorstrawpoll = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorprivacy = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'danger';
		for (let p of this.pages) { p.color = 'light'; }

	}


	registration() {
		this.currentseries = window.localStorage.getItem("series");
		this.iab.create('https://nplcric.in/registration/register.php?series=' + this.currentseries, '_blank', { location: 'yes' });
		this.colorevents = 'light';
		this.colorstrawpoll = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorprivacy = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'danger';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}

	strawpoll() {
		this.currentseries = window.localStorage.getItem("series");
		this.iab.create('http://nplcric.in/strawpoll/strawpoll.php?device_id=' + this.device_id + '&series=' + this.currentseries, '_blank', { location: 'yes' });
		this.colorstrawpoll = 'danger';
		this.colorevents = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorprivacy = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}


	events1() {
		this.currentseries = window.localStorage.getItem("series");
		this.iab.create('http://nplcric.in/events/events.php?device_id=' + this.device_id + '&series=' + this.currentseries, '_blank', { location: 'yes' });
		this.colorevents = 'danger';
		this.colorstrawpoll = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorprivacy = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}

	othergames() {
		this.currentseries = window.localStorage.getItem("series");
		this.iab.create('http://nplcric.in/othergames/othergames.php?device_id=' + this.device_id + '&series=' + this.currentseries, '_blank', { location: 'yes' });
		this.colorothergames = 'danger';
		this.colorstrawpoll = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorevents = 'light';
		this.colorprivacy = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}

	aboutus() {
		this.nav.setRoot(AboutusPage);
		this.coloraboutus = 'danger';
		this.colorstrawpoll = 'light';
		this.colordevelopedby = 'light';
		this.colorprivacy = 'light';
		this.colorevents = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}

	developedby() {
		this.nav.setRoot(DevelopedbyPage);
		this.colordevelopedby = 'danger';
		this.colorprivacy = 'light';
		this.colorstrawpoll = 'light';
		this.coloraboutus = 'light';
		this.colorevents = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}

	privacy() {
		this.iab.create('http://vthinksolution.com/privacypolicy.htm', '_blank', { location: 'yes' });
		this.colorprivacy = 'danger';
		this.colorstrawpoll = 'light';
		this.colorstrawpoll = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorevents = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'light';
		for (let p of this.pages) { p.color = 'light'; }
	}

	godashboard() {
		this.colorevents = 'light';
		this.colordevelopedby = 'light';
		this.coloraboutus = 'light';
		this.colorstrawpoll = 'light';
		this.colorprivacy = 'light';
		this.colorothergames = 'light';
		this.colorregistration = 'light';
		this.colorlive = 'danger';
		for (let p of this.pages) { p.color = 'light'; }
		this.nav.setRoot(DashboardPage);
		window.localStorage.removeItem("series");
		window.localStorage.removeItem("title");
	}




}
