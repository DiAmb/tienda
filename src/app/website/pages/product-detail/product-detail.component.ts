import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from '../../components/models/producto.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  producto: Producto | null = null;
  constructor(
    private route: ActivatedRoute,
    private productoServicio: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productoServicio.getProduct(this.productId);
          }

          return [null];
        })
      )
      .subscribe((data) => {
        this.producto = data;
      });
  }
  goBack() {
    this.location.back();
  }
}
