import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import {
  CategoryModel,
  CollectionModel,
  DiscountModel,
  ProductModel,
  TypeModel,
} from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vincular-oferta',
  templateUrl: './vincular-oferta.component.html',
  styles: [
    `
      :host ::ng-deep .drag-column {
        padding-right: 0.5em;
      }

      .drop-column {
        border: 1px solid transparent;
        transition: border-color 0.2s;
      }
      .drop-column.p-draggable-enter {
        border-color: var(--primary-color);
      }

      .product-item {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        width: 100%;
        border-bottom: 1px solid var(--surface-d);
      }

      .product-item img {
        width: 75px;
        margin-right: 1rem;
      }

      .product-item .product-list-detail {
        flex: 1 1 0;
      }

      .product-item .product-list-action {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .product-item .product-category-icon {
        vertical-align: middle;
        margin-right: 0.5rem;
      }

      .product-item .product-category {
        vertical-align: middle;
        line-height: 1;
      }

      [pDraggable] {
        cursor: move;
      }

      @media screen and (max-width: 576px) {
        .product-item {
          flex-wrap: wrap;
        }

        .product-item .image-container,
        .product-item .product-list-detail,
        .product-item .product-list-action {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .product-item img {
          margin: 0 0 1rem 0;
          width: 100px;
        }

        .product-category-icon {
          display: none;
        }
      }
    `,
  ],
})
export class VincularOfertaComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  category: CategoryModel;
  discount: DiscountModel;
  collectionId: number;

  listProducts: ProductModel[] = [];

  availableProducts: ProductModel[] = [];

  selectedProducts: ProductModel[] = [];

  draggedProduct: ProductModel;
  draggedProductInverse: ProductModel;
  listCategories: CategoryModel[] = [];
  listCollections: CollectionModel[] = [];
  listTypes: TypeModel[] = [];
  listDiscounts: DiscountModel[] = [];

  constructor(
    private titleService: Title,
    public dialogService: DialogService,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getTypes();
  }

  getTypes() {
    
    this.apiService.getAll(Endpoint.types).subscribe({
      next: (res) => {
        this.listTypes = res.data;
        
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }

  getCategories() {
    
    this.apiService.getAll(Endpoint.categories).subscribe({
      next: (res) => {
        this.listCategories = res.data;
        
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }

  changeCategory(id: number) {
    this.listCollections = this.listCategories
      .find((item) => item.id == id)
      .collections.sort((a, b) => a.id - b.id);
    this.listProducts = [];
    this.availableProducts = this.listProducts;
  }

  changeCollection(id: number) {
    this.listProducts = [];
    this.availableProducts = [];
    
    this.apiService.getAll(Endpoint.products + `?col=${id}`).subscribe({
      next: (res) => {
        this.listProducts = res.data;
        this.availableProducts = this.listProducts;
        
        if (this.discount) {
          this.changeDiscount(this.discount.id);
        }
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }

  changeType(id: number) {
    this.listDiscounts = this.listTypes
      .find((item) => item.id == id)
      .discounts.sort((a, b) => a.id - b.id);
    this.selectedProducts = [];
    this.availableProducts = this.listProducts;
  }

  changeDiscount(id: number) {
    this.selectedProducts = this.listProducts.filter(
      (i) => i.productColors[0].discountId == id
    );
    this.availableProducts = this.listProducts.filter(
      (i) => i.productColors[0].discountId != id
    );
  }

  dragStart(event, product: ProductModel) {
    this.draggedProduct = product;
  }

  drop(event) {
    if (this.draggedProduct) {
      const id = this.draggedProduct.id;
      
      this.apiService
        .discount({ id: id, discountId: this.discount.id })
        .subscribe({
          next: (res) => {
            
            this.listProducts.find(
              (i) => i.id == id
            ).productColors[0].discountId = this.discount.id;
            this.listProducts.find(
              (i) => i.id == id
            ).productColors[0].discount = this.discount;
            this.msg.success(res.msg);
          },
          error: (res) => {
            this.msg.error(res.error.msg);
            
          },
        });
      let draggedProductIndex = this.findIndex(this.draggedProduct);
      this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
      this.availableProducts = this.availableProducts.filter(
        (val, i) => i != draggedProductIndex
      );
      this.draggedProduct = null;
    }
  }

  dragEnd(event) {
    this.draggedProduct = null;
  }

  findIndex(product: ProductModel) {
    let index = -1;
    for (let i = 0; i < this.availableProducts.length; i++) {
      if (product.id === this.availableProducts[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  dragStartInverse(event, product: ProductModel) {
    this.draggedProductInverse = product;
  }

  dropInverse(event) {
    if (this.draggedProductInverse) {
      const id = this.draggedProductInverse.id;
      
      this.apiService.discount({ id: id, discountId: null }).subscribe({
        next: (res) => {
          this.listProducts.find(
            (i) => i.id == id
          ).productColors[0].discountId = null;
          this.listProducts.find((i) => i.id == id).productColors[0].discount =
            null;
          this.msg.success(res.msg);
          
        },
        error: (res) => {
          this.msg.error(res.error.msg);
          
        },
      });
      let draggedProductIndex = this.findIndexInverse(
        this.draggedProductInverse
      );
      this.availableProducts = [
        ...this.availableProducts,
        this.draggedProductInverse,
      ];
      this.selectedProducts = this.selectedProducts.filter(
        (val, i) => i != draggedProductIndex
      );
      this.draggedProductInverse = null;
    }
  }

  dragEndInverse(event) {
    this.draggedProductInverse = null;
  }

  findIndexInverse(product: ProductModel) {
    let index = -1;
    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (product.id === this.selectedProducts[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
