import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService{

    public leagueID: any;
    public reviewID: any;

    constructor(private http: HttpClient) { }
    
    getLeagues(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/leaguesCollection?pn=' + page);
    }

    getOneLeague(id: any) {
        this.leagueID = id;
        return this.http.get('http://localhost:5000/api/v1.0/leaguesCollection/' + id);
    }

    getReviews(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/leaguesCollection/' + id + '/reviews');
    }

    postReview(review: any) {
        let postData = new FormData();
        postData.append("username", review.username);
        postData.append("comment", review.comment);
        postData.append("stars", review.stars);

        return this.http.post('http://localhost:5000/api/v1.0/leaguesCollection/' + this.leagueID + '/reviews', postData);
    }

    
    deleteReview(leagueID: any, reviewID: any) {
        console.log('Deleting review with reviewID:', reviewID);
        console.log('League ID:', leagueID);
    
        return this.http.delete(`http://localhost:5000/api/v1.0/leaguesCollection/${leagueID}/reviews/${reviewID}`);
    }


// ################################################################ search attempt
    // New method for searching leagues
  searchLeagues(query: string) {
    return this.http.get('http://localhost:5000/api/v1.0/leaguesCollection/search?query=' + query);
  }

}