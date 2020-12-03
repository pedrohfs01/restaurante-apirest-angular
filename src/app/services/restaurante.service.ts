import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { MEAT_API } from "app/config/api.config";
import { Restaurant } from "app/models/restaurant.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorHandler } from "app/exceptions/error-handler";
import { MenuItem } from "app/models/menu-item.model";

Injectable()
export class RestauranteService{
    
    constructor(public http: Http){
    }

    restaurants() : Observable<Restaurant[]>{
        return this.http.get(`${MEAT_API}/restaurants`).map(response => response.json())
        .catch(ErrorHandler.errorHandler);
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.errorHandler);
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
        .map(response => response.json())
        .catch(ErrorHandler.errorHandler);
    }
    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.errorHandler);
    }
}