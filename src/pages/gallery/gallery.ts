import { Component } from '@angular/core';
import { NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';
import { ServiceProvider } from '../../providers/service/service';
import { AlertController, LoadingController} from 'ionic-angular';
import * as html2canvas from 'html2canvas';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { DisplayphotoPage } from './displayphoto/displayphoto';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

isNetwork:any;
resultData:any;
result:any;
 base64DataImage: string = ''; 
  constructor(public navCtrl: NavController, 
			  private menu: MenuController, 
			  public navParams: NavParams,
			  public events: Events, 
			  private iab: InAppBrowser, 
			  private network: Network, 
			  private myservice: ServiceProvider,
			  private base64ToGallery: Base64ToGallery,
			  public alertCtrl: AlertController,
	          public loadingCtrl: LoadingController) {
  
 	 this.getgalleryimage();;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
	
  }
  
 showslider = false;
 image_path = 0;
  
  getgalleryimage(){
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		loader.present();
  		this.myservice.getgalleryimagedata(1)
		.subscribe(
			data => {
			  this.resultData = data
			  this.result = this.resultData.result;
			//  console.log(this.base64DataImage)
			 loader.dismiss();
			  
			},
			error => {
			  console.log(error.json())
			  loader.dismiss();
			  
			}
		)
  }
			
   openImageSlider = (group: any, index: number): any => {
       			this.showslider = true;
				this.image_path = index;
    } 
	
	// CONVERT IMAGE TO BASE64      
  generateBase64_encode(id) {

	  let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		  duration: 10000
	  });
	  loader.present();
	  html2canvas(document.querySelector("#preview_1")).then(canvas => {
		  this.base64DataImage = canvas.toDataURL('data:image/png;base64'); 
		  loader.dismiss();
		  this.createBase64ToGallery();
	  });
  }
  
  // SAVE BASE64 TO GALLERY
  createBase64ToGallery(){
	 let options: Base64ToGalleryOptions = {
	   prefix: 'NPL_', 
	   mediaScanner: true 
	 };
	 this.base64ToGallery
	   .base64ToGallery(this.base64DataImage, options).then(
		  res => {
		//  console.log(this.base64DataImage);
		  	let alert = this.alertCtrl.create({
				title: 'Success Alert!',
				subTitle: 'Successfully Save Image',
				buttons: ['OK']
			});
			alert.present();
			console.log('Saved image to gallery:', res)  
		  },
		  err => console.log('Error saving image to gallery:', err)
	 );
	}

	gotoGallary(){
		this.navCtrl.setRoot(GalleryPage);
	}
	openImage(index: any) {
		this.navCtrl.push(DisplayphotoPage, { "photos" : this.result,"index" : index }) 
	}


}