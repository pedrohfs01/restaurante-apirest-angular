import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from 'app/services/restaurante.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(public restaurantService: RestauranteService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantService
    .reviewsOfRestaurant(this.route.parent.snapshot.params["id"]);
  }

}
