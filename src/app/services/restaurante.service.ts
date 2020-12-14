import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuItem } from "app/models/menu-item.model";
import { Restaurant } from "app/models/restaurant.model";
import { environment } from "environments/environment";

import { Observable } from "rxjs";

@Injectable()
export class RestauranteService{
    
    constructor(public http: HttpClient){
    }

    allRestaurants(): Observable<Restaurant[]>{
        return this.http.get<Restaurant[]>(`${environment.api}/restaurantes`);
    }

    restaurants(search?: string) : Observable<Restaurant[]>{
        let params: HttpParams = undefined;
        if(search){
            params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${environment.api}/restaurants`, {params: params})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${environment.api}/restaurantes/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${environment.api}/restaurantes/${id}/reviews`)
    }
    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${environment.api}/restaurantes/${id}/menu`);
    }
}