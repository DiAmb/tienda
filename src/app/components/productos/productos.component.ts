import { Component, OnInit } from '@angular/core';
import {
  Producto,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/producto.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  total = 0;
  myShopCar: Producto[] = [];
  products: Producto[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  showProductDetail = false;
  productChosen: Producto = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShopCar = this.storeService.getMyShopCar();
  }

  ngOnInit(): void {
    this.loadMore();
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
    this.toggleProduct();
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
  loadMore() {
    this.productService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
