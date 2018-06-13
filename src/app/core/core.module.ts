import { NgModule } from "@angular/core";
import { OrderService } from "../service/order.service";
import { RestaurantsService } from "../service/restaurants.service";
import { ShoppingCartService } from "../service/shopping-cart.service";

@NgModule({
    providers: [ShoppingCartService, RestaurantsService, OrderService]
})
export class CoreModule {}