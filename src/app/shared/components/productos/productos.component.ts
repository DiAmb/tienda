import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Producto,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../website/components/models/producto.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  total = 0;
  myShopCar: Producto[] = [];
  @Input() products: Producto[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);
  @Output() loadedMore: EventEmitter<string> = new EventEmitter<string>();
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }

  loadMore() {
    this.loadedMore.emit();
  }

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  showProductDetail = false;
  productChosen: Producto = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: -1,
      name: '',
    },
  };

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShopCar = this.storeService.getMyShopCar();
  }

  onAddToShopCar(product: Producto) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
  toggleProduct() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getProduct(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }
  readAndUpdate(id: string) {
    this.productService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productService.update(product.id, { title: 'change' })
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.productService
      .fetchReadAndUpdate(id, { title: 'string nuevo' })
      .subscribe((response) => {
        const red = response[0];
        const update = response[1];
        console.log(red, update);
      });
  }
  createNewProduct() {
    const product: CreateProductDTO = {
      categoryId: 1,
      title: 'Nuevo producto',
      price: 200,
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      description:
        'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain... ',
    };
    this.productService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo',
    };
    const id = this.productChosen.id;
    this.productService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex((item) => item.id == id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }
  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex((item) => item.id == id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
}
