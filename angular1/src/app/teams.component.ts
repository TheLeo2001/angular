import { Component } from '@angular/core';
import { WebService } from './web.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  query: string = '';
  teams: any[] = [];
  statQuery: string = ''; // For searching teams by stats
  teamsByStats: any[] = []; // Adding teamsByStats property
  //teamsByName: any[] = [];

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




searchTeamsByStats() {
  console.log('Searching teams by stats:', this.statQuery);
  if (this.statQuery.trim() !== '') {
    this.webService.searchTeamsByStats(this.statQuery).subscribe({
      next: (data: any[]) => {
        console.log('Search results:', data);
        this.teamsByStats = data.map(item => {
          return {
            team: item.k,
            stats: item.v
          };
        });
        console.log(this.teamsByStats); // Log the teamsByStats array
      },
      error: (error: any) => {
        console.error('Error:', error);
        // Handle errors if any
      }
    } as Observer<any>);
  }
}

  

  getKey(obj: any): string {
    // Get the key (team name) of the first property of the object
    return Object.keys(obj)[0];
  }
}