import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaguesComponent } from './leagues.component';
import { WebService } from './web.service';
//import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { OneLeagueComponent } from './oneleague.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './nav.component';

var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'leaguesCollection',
    component: LeaguesComponent

  },
  {
    path: 'leaguesCollection/:id',
    component: OneLeagueComponent

  }
];

@NgModule({
  declarations: [
    AppComponent, LeaguesComponent, HomeComponent, OneLeagueComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, 
    RouterModule.forRoot(routes), ReactiveFormsModule, 
    AuthModule.forRoot( {
      domain: 'dev-tdclipeh67pufov5.us.auth0.com',
      clientId: 'JaoH9Dfe7q0dqcbZaYT1wCSMKTBbowbR',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
