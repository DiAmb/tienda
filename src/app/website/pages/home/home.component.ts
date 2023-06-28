import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from '../../components/models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  limit = 10;
  offset = 0;
  products: Producto[] = [];
  productId: string | null = null;
  constructor(
    private productsService: ProductsService,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMore();
    this.activeroute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
  }
  loadMore() {
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
