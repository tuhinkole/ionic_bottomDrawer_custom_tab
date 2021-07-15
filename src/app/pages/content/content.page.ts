import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  showValue = null;

  constructor(private insomnia: Insomnia,private browserTab: BrowserTab,private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) {

    this.getToken();

    this.insomnia.keepAwake()
    .then(
      () => {
        console.log('keepAwake success')
        this.getToken();

      },
      () =>{
        console.log('keepAwake error')
      }
    );
  
  this.insomnia.allowSleepAgain()
    .then(
      () => {
        console.log('allowSleepAgain success')
        this.getToken();

      },
      () => {
        console.log('allowSleepAgain error')
      }
    );
   }

   ionViewWillEnter(){
    this.getToken();

 
  }
  ionViewDidEnter(){
    this.getToken();


  }

   handleOpenUrl(url: string) {
     let urlArr = url.split("?");
     let token = urlArr[urlArr.length - 1].split("=")[1];
    this.showValue = token;

   }

  ngOnInit() {
    this.getToken();
    this.level = this.route.snapshot.paramMap.get('level');
  }

  ngAfterViewInit(){
   this.getToken();
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible;
    this.changeDetectorRef.detectChanges();

  }

  openUrl(){
    this.testUrl((ev)=>{
      this.getToken();
    })

  }
 

  async testUrl(callback){
    this.browserTab.isAvailable()
        .then((isAvailable: boolean) => {

        if(isAvailable) {
          var testURL = 'https://staging.stockedge.com/Login/Test?client_id=SE-TEST-REDIRECT-LOGIN-ACCESS-CODE&redirect_uri=io.ionic.starter://test/cordova/io.ionic.starter/callback';

            this.browserTab.openUrl(testURL)
            .then((result: any) => {
              alert(JSON.stringify(result));
              this.getToken();
              callback();
            },
            (error: any) => console.error(error)
          );

          this.browserTab.close().then(()=>{
            callback();

          })
            

        } else {

          console.log('if custom tabs are not available you may  use InAppBrowser');
          
        }

        });   
    
    

// cordova.plugins.browsertab.isAvailable(function(result) {
//     if (!result) {
//       cordova.InAppBrowser.open(testURL, '_system');
//     } else {
//       cordova.plugins.browsertab.openUrl(
//           testURL,
//           function(successResp) {
//             this.getToken();
//           },
//           function(failureResp) {

//           });
//     }
//   },
//   function(isAvailableError) {
//   });
}

getToken(){
  window.handleOpenURL = (url: string) => {
    setTimeout(() => {
      this.handleOpenUrl(url);
    }, 300);
  };

  // check if app was opened by custom url scheme
  const lastUrl: string = window.handleOpenURL_LastURL || "";
  if (lastUrl && lastUrl !== "") {
    window.handleOpenURL_LastURL;
    setTimeout(() => {
      this.handleOpenUrl(lastUrl);
    }, 300);
  }
}

}
