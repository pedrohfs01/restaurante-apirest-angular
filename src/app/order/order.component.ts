import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/models/cart-item.model';
import { RadioOption } from 'app/models/radio-option.model';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 10;

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON" },
    { label: "Cartão de débito", value: "DEB" },
    { label: "Cartão refeição", value: "REF" },
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number{
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

  remove(item: CartItem){
    this.orderService.remove(item);
  }

}
