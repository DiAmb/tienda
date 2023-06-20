import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent {
  @Input() product: Producto = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };

  @Output() addedProduct = new EventEmitter<Producto>();
  @Output() showProduct = new EventEmitter<string>();

  toggleCart() {
    this.addedProduct.emit(this.product);
  }
  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}
