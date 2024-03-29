import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'oneleague',
  templateUrl: './oneleague.component.html',
  styleUrls: ['./oneleague.component.css']
})
export class OneLeagueComponent {

    reviewForm: any

    Object = Object;

    constructor(public webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public authService: AuthService) { }

    ngOnInit() {

        this.reviewForm = this.formBuilder.group( {
            username: ['', Validators.required],
            comment: ['', Validators.required],
            stars: 5
        });

        this.leagues_list = this.webService.getOneLeague(this.route.snapshot.params['id']);
        this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
        
    }

    onSubmit() {
        this.webService.postReview(this.reviewForm.value)
        .subscribe( ( response: any) => {
            this.reviewForm.reset();
            this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
        })
        
    }

    isInvalid(control: any) {
        return this.reviewForm.controls[control].invalid &&
               this.reviewForm.controls[control].touched;

    }

    isUnTouched() {
        return this.reviewForm.controls.username.pristine ||
               this.reviewForm.controls.comment.pristine;
    }

    isIncomplete() {
        return this.isInvalid('username') ||
               this.isInvalid('comment') ||
               this.isUnTouched();

    }

    

deleteReview(reviewID: any) {
    console.log('Deleting review with reviewID:', reviewID);

    if (!reviewID) {
        console.error('Invalid reviewID:', reviewID);
        return;
    }

    const leagueID = this.webService.leagueID;
    console.log('League ID:', leagueID);

    this.webService.deleteReview(leagueID, reviewID)
        .subscribe(
            () => {
                console.log('Delete request successful.');
                this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
            },
            (error) => {
                console.error('Error deleting review:', error);
            }
        );
}



    leagues_list: any = [];
    reviews: any = [];
  
}
