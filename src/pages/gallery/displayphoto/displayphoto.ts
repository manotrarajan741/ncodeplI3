import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import * as html2canvas from 'html2canvas';
import { Base64ToGalleryOptions, Base64ToGallery } from '@ionic-native/base64-to-gallery';

/**
 * Generated class for the DisplayphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-displayphoto',
  templateUrl: 'displayphoto.html',
})
export class DisplayphotoPage {
  photos: any = [];
  index: any;
  base64DataImage: string = '';
  showSaveBtn: boolean = true;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    private base64ToGallery: Base64ToGallery, 
    public loadingCtrl: LoadingController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.photos = this.navParams.get("photos");
    this.index = this.navParams.get("index");
    //  console.log('ionViewDidLoad DisplayphotoPage');
  }

  // CONVERT IMAGE TO BASE64      
  generateBase64_encode(id) {

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });
    loader.present();

    html2canvas(document.querySelector("#preview_" + id), { useCORS: true, imageTimeout: 500000 }).then(
      canvas => {
        this.base64DataImage = canvas.toDataURL("image/png");
        loader.dismiss();
        this.createBase64ToGallery();
      },
      err => {
        console.log('Error image:', err)
      });

  }

  // // SAVE BASE64 TO GALLERY
  createBase64ToGallery() {
    let options: Base64ToGalleryOptions = {
      prefix: 'img',
      mediaScanner: true
    };
    // console.log(this.base64DataImage);

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
        err => console.log('Error saving image to gallery:', err)
      );
  }
}
