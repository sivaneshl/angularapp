import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() {
  }

// normal way of get service (w/o promise)
//  getDishes(): Dish[] {
//    return DISHES;
//  }
// simple promise
// getDishes(): Promise<Dish[]> {
//   return Promise.resolve(DISHES);
// }

  // with promise and latency -  resolves later after time delay
  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      // simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id) )[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);
  }

  // with promise and time delay
  // getDish(id: number): Promise<Dish> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id) )[0]), 2000);
  //   });
  // }
  //
  // getFeaturedDish(): Promise<Dish> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
  //   });
  // }

}
