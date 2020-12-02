import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { MEAT_API } from "app/config/api.config";
import { Restaurant } from "app/models/restaurant.model";
import { Observable } from "rxjs";

Injectable()
export class RestauranteService{
    
    constructor(public http: Http){
    }
    restaurants() : Observable<Restaurant[]>{
        return this.http.get(`${MEAT_API}/restaurants`).map(response => response.json());
    }
}