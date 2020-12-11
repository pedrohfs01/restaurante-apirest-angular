import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/config/api.config";
import { MenuItem } from "app/models/menu-item.model";
import { Restaurant } from "app/models/restaurant.model";

import { Observable } from "rxjs";

@Injectable()
export class RestauranteService{
    
    constructor(public http: HttpClient){
    }

    allRestaurants(): Observable<Restaurant[]>{
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurantes`);
    }

    restaurants(search?: string) : Observable<Restaurant[]>{
        let params: HttpParams = undefined;
        if(search){
            params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurantes/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurantes/${id}/reviews`)
    }
    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurantes/${id}/menu`);
    }
}