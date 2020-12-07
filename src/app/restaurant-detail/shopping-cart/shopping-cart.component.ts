import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'app/services/shopping-cart.service';


@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({opacity: 0, transform: "translateX(-30px)", offset: 0}),
        style({opacity: 0.8, transform: "translateX(-10px)", offset: 0.8}),
        style({opacity: 1, transform: "translateX(0px)", offset: 1})
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({opacity: 1, transform: "translateX(0px)", offset: 0}),
        style({opacity: 0.8, transform: "translateX(-10px)", offset: 0.2}),
        style({opacity: 0, transform: "translateX(30px)", offset: 1})
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(public cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items() : any[]{
    return this.cartService.items;
  }

  total() : number{
    return this.cartService.total();
  }

  clear(){
    this.cartService.clear();
  }

  removeItem(item: any){
    this.cartService.removeItem(item);
  }

  addItem(item: any){
    this.cartService.addItem(item);
  }

}
