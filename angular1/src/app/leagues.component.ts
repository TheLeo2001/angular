import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {

    Object = Object;

    leagues_list: any = [];
    page: number = 1;

    constructor(public webService: WebService) { }

    ngOnInit() {
        if (sessionStorage['page']) {
            this.page = Number(sessionStorage['page'])
        }
        this.leagues_list = this.webService.getLeagues(this.page);
    }

    previousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;
            sessionStorage['page'] = this.page
            this.leagues_list = this.webService.getLeagues(this.page);
        }
    }

    nextPage() {
        this.page = this.page + 1;
        sessionStorage['page'] = this.page
        this.leagues_list = this.webService.getLeagues(this.page);
    }
  
}
