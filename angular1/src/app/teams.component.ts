import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { Observer } from 'rxjs';
//import { Chart, ChartOptions } from 'chart.js';
//import * as Chart from 'chart.js';
import { Chart, ChartScales } from 'chart.js';



//declare var Chart: any; // Declare Chart.js globally

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit{
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  query: string = '';
  teams: any[] = [];
  statQuery: string = ''; // For searching teams by stats
  teamsByStats: any[] = []; // Adding teamsByStats property
  //teamsByName: any[] = [];
  bestTeam: any; // Adding bestTeam property to store the best team
  teamStats: any = null; // chart team info
  chart!: any; // Variable to hold the chart instance

  constructor(public webService: WebService) { }

  ngOnInit() {
  }

  // searchTeams() {
  //   if (this.query.trim() !== '') {
  //     this.webService.searchTeams(this.query).subscribe((data: Object) => {
  //       // Assuming data is an array, cast it to any[] if needed
  //       this.teams = data as any[]; 
  //       console.log(this.teams); // Log the teams array
  //     });
  //   }
  // }


  searchTeams() {
    if (this.query.trim() !== '') {
      this.webService.searchTeams(this.query).subscribe((data: Object) => {
        this.teams = data as any[];
        if (this.teams.length > 0) {
          this.teamStats = this.teams[0][this.getKey(this.teams[0])];
          if (this.chart) {
            this.chart.destroy(); // Destroy previous chart instance
          }
          this.createChart();
        }
      });
    }
  }


  createChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['W', 'D', 'L', 'GA', 'GD', 'GF', 'GP', 'PPG'],
          datasets: [{
            label: this.query,
            data: [
              this.teamStats['W'],
              this.teamStats['D'],
              this.teamStats['L'],
              this.teamStats['GA'],
              this.teamStats['GD'],
              this.teamStats['GF'],
              this.teamStats['GP'],
              this.teamStats['PPG']
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{ 
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
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



findBestTeam() {
  if (this.teamsByStats.length > 0) {
    this.bestTeam = this.teamsByStats.reduce((prev, current) => 
      (prev.stats.PPG > current.stats.PPG) ? prev : current
    );
  }
}


  

  getKey(obj: any): string {
    // Get the key (team name) of the first property of the object
    return Object.keys(obj)[0];
  }
}