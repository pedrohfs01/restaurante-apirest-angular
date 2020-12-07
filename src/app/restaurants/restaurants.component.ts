import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/models/restaurant.model';
import { RestauranteService } from 'app/services/restaurante.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  restaurants: Restaurant[];

  constructor(public restaurantService: RestauranteService) { }

  ngOnInit() {
    this.restaurantService.restaurants().subscribe(response => this.restaurants = response);
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}
