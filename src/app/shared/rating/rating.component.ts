import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>();

  rates: number[] = [1,2,3,4,5];

  rate: number = 0;

  previous: number;

  constructor() { }

  ngOnInit() {
  }
  setRate( r: number){
    this.rate = r; 
    this.previous = undefined;
    this.rated.emit(this.rate);
  }
  setTemporaryRate(r: number){
    if(this.previous=== undefined){
      this.previous =  this.rate;
    }

    this.rate = r;
  }
  clearTemporaryRate(){
    if(this.previous !== undefined){
      this.rate = this.previous;
      this.previous = undefined;
    }
  }

}
