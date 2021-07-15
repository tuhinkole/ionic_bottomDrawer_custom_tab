import { MenuListPageModule } from './pages/menu-list/menu-list.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MenuListPageModule],
  providers: [
    Insomnia,
    BrowserTab,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
