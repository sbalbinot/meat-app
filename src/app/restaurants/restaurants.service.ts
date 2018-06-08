import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MEAT_API } from "../app.api";
import { ErrorHandler } from "../app.error-handler";
import { Restaurant } from "./restaurant/restaurant.model";

@Injectable()
export class RestaurantsService {
    
    constructor(private http: Http) {}

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEAT_API}/restaurants`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError)
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError)
    }
}