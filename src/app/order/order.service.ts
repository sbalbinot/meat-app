import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MEAT_API } from "../app.api";
import { Order } from "../order/order.model";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";

@Injectable()
export class OrderService {
    
    constructor(private http: HttpClient, private cartService: ShoppingCartService) {}

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
        return this.http.post<Order>(`${MEAT_API}/orders`, order).map(order => order.id)
    }

    clear() {
        this.cartService.clear()
    }
}
