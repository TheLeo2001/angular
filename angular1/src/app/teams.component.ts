import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  query: string = '';
  teams: any[] = [];

  constructor(public webService: WebService) { }

  searchTeams() {
    if (this.query.trim() !== '') {
      this.webService.searchTeams(this.query).subscribe((data: Object) => {
        // Assuming data is an array, cast it to any[] if needed
        this.teams = data as any[]; 
        console.log(this.teams); // Log the teams array
      });
    }
  }

  getKey(obj: any): string {
    // Get the key (team name) of the first property of the object
    return Object.keys(obj)[0];
  }
}
