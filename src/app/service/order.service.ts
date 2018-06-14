import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MEAT_API } from "../app.api";
import { Order } from "../order/order.model";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable()
export class OrderService {
    
    constructor(private http: Http, private cartService: ShoppingCartService) {}

    itemsValue(): number {
        return this.cartService.total()
    }

    carItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    checkOrder(order: Order): Observable<string> {
        const _headers = new Headers()
        _headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`,
                              JSON.stringify(order),
                              new RequestOptions({headers: _headers}))
                        .map(response => response.json())
                        .map(order => order.id)
    }

    clear() {
        this.cartService.clear()
    }
}