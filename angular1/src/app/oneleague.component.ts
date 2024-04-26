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

    reviewForm: any;
    editReviewForm: any;
    editingReview: any = null;

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

        this.editReviewForm = this.formBuilder.group( {
            editUsername: ['', Validators.required],
            editComment: ['', Validators.required],
            editStars: [5, Validators.required]
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

    isInvalidEdit(control: any) {
        return this.editReviewForm.controls[control].invalid &&
               this.editReviewForm.controls[control].touched;

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

    editReview(review: any) {
        this.editingReview = review;
        this.editReviewForm.patchValue({
            editUsername: review.username,
            editComment: review.comment,
            editStars: review.stars
        });
    }

    cancelEdit() {
        this.editingReview = null;
        this.editReviewForm.reset();
    }

    updateReview() {
        const reviewID = this.editingReview.id;
        const leagueID = this.webService.leagueID;
        const reviewData = {
            username: this.editReviewForm.value.editUsername,
            comment: this.editReviewForm.value.editComment,
            stars: this.editReviewForm.value.editStars
        };
    
        this.webService.editReview(leagueID, reviewID, reviewData)
            .subscribe(
                (response: any) => {
                    this.editReviewForm.reset();
                    this.editingReview = null;
                    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
                },
                (error) => {
                    console.error('Error updating review:', error);
                }
            );
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
