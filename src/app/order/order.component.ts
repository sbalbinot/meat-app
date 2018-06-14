import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from '../service/order.service';
import { PATTERNS } from '../shared/constant/patterns';
import { RadioOption } from '../shared/radio/radio-option.model';
import { compare } from '../shared/validator/validator';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private router: Router, private fb: FormBuilder, private orderService: OrderService) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.pattern(PATTERNS.email)]),
      emailConfirmation: this.fb.control('', [Validators.required, Validators.pattern(PATTERNS.email)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(PATTERNS.number)]),
      optionalAddress: this.fb.control(''),
      paymentOption: this.fb.control('', [Validators.required])
    }, {validator: compare('email', 'emailConfirmation')}) // função de comparar no arquivo /shared/validators.ts... alternativa dinâmica para o método 'equalsTo'
       /* {validator: OrderComponent.equalsTo} */
  }

  /* static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined
    }
    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }
    return undefined
  } */

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.carItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
    })
  }

}
