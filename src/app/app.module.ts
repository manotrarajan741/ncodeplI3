import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FCM } from '@ionic-native/fcm'; 
import { ServiceProvider } from '../providers/service/service';           
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';    
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LivescroePage } from '../pages/livescroe/livescroe';
import { LivetvPage } from '../pages/livetv/livetv';   
import { PlayersPage } from '../pages/players/players';
import { PlayerinfoPage } from '../pages/playerinfo/playerinfo';
import { SchedulePage } from '../pages/schedule/schedule';
import { MatchesPage } from '../pages/matches/matches';
import { ScoreboardPage } from '../pages/scoreboard/scoreboard';
import { PointsPage } from '../pages/points/points';
import { PipesModule } from '../pipes/pipes.module';
import { SearchPipe } from '../pipes/search/search';
import { OrderByPipe } from '../pipes/sort/sort'; 
import { TeamsPage } from '../pages/teams/teams';
import { TeamsdetailPage } from '../pages/teams/teams-detail/teams-detail';
import { StatisticsPage } from '../pages/statistics/statistics';
import { MostrunPage } from '../pages/statistics/mostrun/mostrun';
import { MostwicketPage } from '../pages/statistics/mostwicket/mostwicket'; 
import { MostfiftiesPage } from '../pages/statistics/mostfifties/mostfifties';
import { MosthundredPage } from '../pages/statistics/mosthundred/mosthundred'; 
import { MostfourPage } from '../pages/statistics/mostfour/mostfour';
import { MostsixesPage } from '../pages/statistics/mostsixes/mostsixes'; 
import { MostindscorePage } from '../pages/statistics/mostindscore/mostindscore'; 
import { MostbollingPage } from '../pages/statistics/mostbolling/mostbolling';
import { BiddingPage } from '../pages/bidding/bidding'; 
import { SponsorPage } from '../pages/sponsor/sponsor';
import { SponsorDetailPage } from '../pages/sponsor/sponsor-detail/sponsor-detail';     
import { CommitteePage } from '../pages/committee/committee';
import { CommitteeDetailPage } from '../pages/committee/committee-detail/committee-detail';
import { GalleryPage } from '../pages/gallery/gallery';
import { DisplayphotoPage } from '../pages/gallery/displayphoto/displayphoto';
import { SelfiePage } from '../pages/selfie/selfie';
import { StrawpollPage } from '../pages/strawpoll/strawpoll';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { DevelopedbyPage } from '../pages/developedby/developedby'; 
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen'; 


@NgModule({
  declarations: [
    MyApp,
    HomePage,
	DashboardPage,
	LivescroePage,
	LivetvPage,
	PlayersPage,
	PlayerinfoPage,
	SchedulePage,
	MatchesPage,
	ScoreboardPage,
	PointsPage,
	SearchPipe,
	OrderByPipe,
	TeamsPage,
	TeamsdetailPage,
	StatisticsPage,
	MostrunPage,
	MostwicketPage,
	MostfiftiesPage,
	MosthundredPage,
	MostfourPage,
	MostsixesPage,
	MostindscorePage,
	MostbollingPage,
	BiddingPage,
	SponsorPage,
	SponsorDetailPage,
	CommitteePage,
	CommitteeDetailPage,
	GalleryPage,
	DisplayphotoPage, 
	SelfiePage,
	StrawpollPage,
	AboutusPage,
	DevelopedbyPage,
    ListPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
	HttpClientModule, 
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	DashboardPage,
	LivescroePage,
	LivetvPage,
	PlayersPage,
	PlayerinfoPage,
	SchedulePage,
	MatchesPage,
	ScoreboardPage,
	PointsPage,
	TeamsPage,
	TeamsdetailPage,
	StatisticsPage,
	MostrunPage,
	MostwicketPage,
	MostfiftiesPage, 
	MosthundredPage, 
	MostfourPage,
	MostsixesPage,
	MostindscorePage,
	MostbollingPage,
	BiddingPage,
	SponsorPage,
	SponsorDetailPage,
	CommitteePage,
	CommitteeDetailPage,
	GalleryPage,
	DisplayphotoPage, 
	SelfiePage,
	StrawpollPage, 
	AboutusPage,
	DevelopedbyPage,
	ListPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
	InAppBrowser,
	Camera,
	Base64ToGallery,
	Network,
	SocialSharing,
	ServiceProvider,
	PipesModule,
	FCM,
	AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
