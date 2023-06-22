import { Injectable } from '@angular/core';
import { Producto } from '../components/models/producto.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShopCar: Producto[] = [];
  private myCart = new BehaviorSubject<Producto[]>([]);

  myCart$ = this.myCart.asObservable();

  addProduct(product: Producto) {
    this.myShopCar.push(product);
    this.myCart.next(this.myShopCar);
  }
  getMyShopCar() {
    return this.myShopCar;
  }
  getTotal() {
    return this.myShopCar.reduce((sum, item) => sum + item.price, 0);
  }
}
