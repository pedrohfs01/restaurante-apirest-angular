import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/models/restaurant.model';
import { RestauranteService } from 'app/services/restaurante.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { switchMap, tap, debounceTime, distinctUntilChanged, catchError } from "rxjs/operators"

import { Observable, from } from 'rxjs';



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

  searchForm: FormGroup;
  searchControl: FormControl;

  restaurants: Restaurant[];

  constructor(public restaurantService: RestauranteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(response => this.restaurantService.restaurants(response).pipe(
          catchError(error => from([])))))
      .subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantService.allRestaurants().subscribe(response => this.restaurants = response);

  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}
