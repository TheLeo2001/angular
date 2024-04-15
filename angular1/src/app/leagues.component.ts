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
    //filteredLeagues: any = [];
    page: number = 1;
    searchTerm: string = ''; // New property for holding the search term

    leagues: any[] = [];
    filteredLeagues: any[] = [];
    
    constructor(public webService: WebService) { }

    ngOnInit() {
        if (sessionStorage['page']) {
            this.page = Number(sessionStorage['page'])
        }
        this.loadLeagues();
    }

    loadLeagues() {
        this.webService.getLeagues(this.page).subscribe(data => {
            this.leagues_list = data;
            this.filteredLeagues = data as any[]; // Initialize filteredLeagues with all leagues
        });
    }

    previousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;
            sessionStorage['page'] = this.page;
            this.loadLeagues(); // Load leagues after page change
        }
    }

    nextPage() {
        this.page = this.page + 1;
        sessionStorage['page'] = this.page;
        this.loadLeagues(); // Load leagues after page change
    }

    // New method for handling search
    search() {
        if (this.searchTerm.trim() !== '') {
            this.webService.searchLeagues(this.searchTerm).subscribe((data: any) => {
                this.filteredLeagues = data;
            });
        } else {
            this.filteredLeagues = this.leagues_list; // If search term is empty, display all leagues
        }
    }


    filterLeaguesWithGoodReviews(): void {
        this.webService.get('http://localhost:5000/api/v1.0/leaguesCollection/goodreviews').subscribe(
            (data: any) => {
                this.filteredLeagues = data.highly_rated_reviews; // Assuming the received data contains complete league objects
                console.log(this.filteredLeagues); // Log the filteredLeagues array to inspect its contents
            },
            (error: any) => {
                console.error('Error fetching highly rated reviews:', error);
            }
        );
    }

    
}
