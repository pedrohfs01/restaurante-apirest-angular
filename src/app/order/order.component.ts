import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/models/cart-item.model';
import { Order, OrderItem } from 'app/models/order.model';
import { RadioOption } from 'app/models/radio-option.model';
import { OrderService } from 'app/services/order.service';

import { tap } from "rxjs/operators"

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  delivery: number = 10;

  orderId: string;

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON" },
    { label: "Cartão de débito", value: "DEB" },
    { label: "Cartão refeição", value: "REF" },
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.email]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required]),
      optionalAddress: this.formBuilder.control(''),
      paymentOptional: this.formBuilder.control('', [Validators.required])
    }, { validators: [OrderComponent.equalsTo], updateOn: 'blur' })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }
    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }


  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menu.id))

    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId;
      }))
      .subscribe((orderId: string) => {
        this.orderService.clear();
        this.router.navigate(['/order-summary']);
      });
  }
}
