import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController, Platform  } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { AlertController, LoadingController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-selfie',
  templateUrl: 'selfie.html',
})
export class SelfiePage { 

isNetwork:any;
  imagepath: string = 'assets/selfie/noframe.png';
  framepath: string = 'assets/selfie/images.jpg';
  base64DataImage: string = ''; 
  widthpx = 0;
  heightpx = 0;
  
  constructor(public navCtrl: NavController, 
              private menu: MenuController, 
			  public navParams: NavParams, 
			  public events: Events,
			  private iab: InAppBrowser, 
			  private network: Network, 
			  public platform : Platform,
			  public camera : Camera, 
			  private base64ToGallery: Base64ToGallery,
			  private socialSharing: SocialSharing,
			  public alertCtrl: AlertController,
	      public loadingCtrl: LoadingController,
			  public sanitizer: DomSanitizer,
			  private androidPermissions: AndroidPermissions
			  ) {
       
	   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
		result => console.log('Has permission?',result.hasPermission),
		err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
	  );
	  
	  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
	   
	   
	  this.events.subscribe('user:created', (framepath, time) => {
		this.imagepath = framepath; 
	  }); 
	  
	  this.platform.ready().then((readySource) => {
		this.widthpx = platform.width();  
		this.heightpx = platform.height() - 140;
	  });	
 
		this.events.publish('user:dashboard');
 
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad SelfiePage');
		
	
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(true,'rightside');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    //this.menu.swipeEnable(false);
    // If you have more than one side menu, use the id like below
     this.menu.swipeEnable(false, 'rightside');
   }
  
  
  toggleRightMenu() {
  this.menu.toggle('right');
}
  
  
  // CONVERT IMAGE TO BASE64      
  generateBase64_encode() {
	  let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		  duration: 10000
	  });
	  loader.present();
	
	   html2canvas(document.querySelector("#preview"),{useCORS: true,imageTimeout:500000,logging: true}).then( 
      canvas => {
	     this.base64DataImage = canvas.toDataURL("image/png");
                    this.createBase64ToGallery();
					loader.dismiss();
					
                  
		    },
      err => {
          console.log('Error image:', err)
      });
	  
  }
  
  // SAVE BASE64 TO GALLERY
  createBase64ToGallery(){
	 let options: Base64ToGalleryOptions = {
	   prefix: '_img', 
	   mediaScanner: true
	 };
	 this.base64ToGallery
	   .base64ToGallery(this.base64DataImage, options).then(
		  res => {
		  	let alert = this.alertCtrl.create({
				title: 'Success Alert!',
				subTitle: 'Successfully Save Image',
				buttons: ['OK']
			});
			alert.present();
			console.log('Saved image to gallery:', res)  
		  },
		  err => {
		  let alert = this.alertCtrl.create({
				title: 'Alert!',
				subTitle: 'Please Give the Storage Permissions',
				buttons: ['OK']
			});
			alert.present();
		  
		  console.log('Error saving image to gallery:', err)}
	 );
  }
  
  // OPEN CAMERA
  openCamera(){
  	const options : CameraOptions = {
		quality: 100,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
		this.framepath = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      });
  }  
  
  // FOR USE IMAGE PREVIEW AND SELECT IMAGE
  showImagePreview(event: any) {
	  if (event.target.files && event.target.files[0]) {
		  var reader = new FileReader();
		  reader.onload = (event: any) => {
			  this.framepath = event.target.result;
		  }
		  reader.readAsDataURL(event.target.files[0]);
	  }
  }
  
  openGallery(){
  	let element:HTMLElement = document.getElementById("file_chooser") as HTMLElement;
	//console.log(element)
	element.click();
  }
  
  //share image
  share()
  {
	  html2canvas(document.querySelector("#preview"),{ useCORS: true, imageTimeout: 500000 }).then(canvas => {
	   this.base64DataImage = canvas.toDataURL("image/png");
	   this.socialSharing.share('Create your own team image.Very nice selfie feature by http://vthinksolution.com', null,this.base64DataImage, null) 
	   });
  }
  
  
}