import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition  } from '@angular/animations';
import { Restaurant } from 'app/models/restaurant.model';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({
          opacity: 0, transform: 'translate(30-px, -10px)'
        }), animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
