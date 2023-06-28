import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from '../../components/models/producto.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  productId: string | null = null;
  products: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoServicio: ProductsService,
    private activeroute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productoServicio.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }

          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
    this.activeroute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }
  loadMore() {
    if (this.categoryId)
      this.productoServicio
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(
            data.filter((product) => product.images.length > 0)
          );
          this.offset += this.limit;
        });
  }
}
