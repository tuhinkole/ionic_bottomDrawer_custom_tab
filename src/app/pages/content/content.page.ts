import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Platform } from '@ionic/angular';
import { MenuListPageRoutingModule } from '../menu-list/menu-list-routing.module';



declare const window: any;
declare var cordova : any;
@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  backdropVisible = false;

  level = null;
  showValue: string = "";

  constructor(
    private plaform: Platform,
    private insomnia: Insomnia,
    private browserTab: BrowserTab,
    private route: ActivatedRoute,
    private safariViewController: SafariViewController,
    private changeDetectorRef: ChangeDetectorRef) {
   }

   handleOpenUrl(url: string) {
     let urlArr = url.split("?");
     let token = urlArr[urlArr.length - 1].split("=")[1];
    this.showValue = token;

   }

  ngOnInit() {
    this.level = this.route.snapshot.paramMap.get('level');
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible;
    this.changeDetectorRef.detectChanges();

  }

  openUrl(){
    this.testUrl((result)=>{
      console.log(result);
      if(result.event === 'opened') console.log('Opened');
        else if(result.event === 'loaded') console.log('Loaded');
        else if(result.event === 'closed'){
          this.getToken();
        }
    }, err=>{
      console.log(err);
    })

  }
 

  async testUrl(callback, error){
    var testURL = 'https://staging.stockedge.com/Login/Test?client_id=SE-TEST-REDIRECT-LOGIN-ACCESS-CODE&redirect_uri=io.ionic.starter://test/cordova/io.ionic.starter/callback';

    this.safariViewController.isAvailable()
  .then((available: boolean) => {
      if (available) {

        this.safariViewController.show({
          url: testURL,
          hidden: false,
          animated: false,
          transition: 'curl',
          enterReaderModeIfAvailable: true,
          tintColor: '#ff0000'
        })
        .subscribe((result: any) => {
            callback(result)
          },
          (err: any) => {
            error(err);
          }
        );

      } else {
        // use fallback browser, example InAppBrowser
      }
    }
  );
}

  getToken(){
    console.log("a");
    this.showValue = "Before Extract";
    (window as any).handleOpenURL = (url: string) => {
      console.log("b", url)
      this.showValue = "After url Extract";
      let urlArr = url.split("?");
      let token = urlArr[urlArr.length - 1].split("=")[1];
      alert(token);
      this.showValue = "Url Extracted";
      this.plaform.resume.subscribe(()=>{
        this.showValue = token
        console.log("d", this.showValue, token);
      });
    };
  }

}
