import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'app/models/menu-item.model';
import { RestauranteService } from 'app/services/restaurante.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(public restaurantService: RestauranteService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantService.menuOfRestaurant(
      this.route.parent.snapshot.params["id"])
  }
}
