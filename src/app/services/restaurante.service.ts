import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MEAT_API } from "app/config/api.config";
import { ErrorHandler } from "app/exceptions/error-handler";
import { MenuItem } from "app/models/menu-item.model";
import { Restaurant } from "app/models/restaurant.model";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RestauranteService{
    
    constructor(public http: HttpClient){
    }

    restaurants(search?: string) : Observable<Restaurant[]>{
        let params: HttpParams = undefined;
        if(search){
            params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }
    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
    }
}