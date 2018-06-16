import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MEAT_API } from "../app.api";
import { Order } from "../order/order.model";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { LoginService } from "../security/login/login.service";

@Injectable()
export class OrderService {
    
    constructor(private http: HttpClient, private loginService: LoginService,private cartService: ShoppingCartService) {}

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
        let headers = new HttpHeaders()
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers}).map(order => order.id)
    }

    clear() {
        this.cartService.clear()
    }
}