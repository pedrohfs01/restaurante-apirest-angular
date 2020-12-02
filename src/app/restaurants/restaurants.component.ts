import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/models/restaurant.model';
import { RestauranteService } from 'app/services/restaurante.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private restaurantService: RestauranteService) { }

  ngOnInit() {
    this.restaurants = this.restaurantService.restaurants();
  }

}
