import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'app/models/restaurant.model';
import { RestauranteService } from 'app/services/restaurante.service';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;

  constructor(public restaurantService: RestauranteService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.restaurantService.restaurantById(this.route.snapshot.params["id"])
    .subscribe(response => this.restaurant = response);
  }

}
