import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/website/components/models/producto.model';

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
      id: -1,
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
