import { Component } from '@angular/core';
//import { LeaguesComponent } from './leagues.component';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: []
})
export class NavComponent {

    constructor(public authService: AuthService,
                public router: Router) {}

  //title = 'angular1';
}
