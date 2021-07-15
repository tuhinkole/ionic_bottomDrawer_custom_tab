import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'seoFriendlyApp';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.clipBoard();
    });
  }
  clipBoard(){
    var permissions = this.androidPermissions.PERMISSION;

    permissions.requestPermission(permissions.ClipboardWrite, success, error);

    function error() {
      console.warn('ClipboardWrite permission is not turned on');
    }

    function success( status ) {
      if( !status.hasPermission ) error();
    }
  }
}
