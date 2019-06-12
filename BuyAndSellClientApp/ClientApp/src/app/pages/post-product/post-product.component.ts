import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { PostProductService } from 'src/app/service/post-product.service';


@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  public model: any;
  public categories = [];
  public categoriesName = [];
  public categoriesParentId = [];
  private categoryNameCounter: number = 0;
  public searchCategory: String = "";
  public searchCategoryModel: any = {};
  private productProperties: any = [];



  values = '';

  constructor(private data: ProductCategoryService, private postProductdata: PostProductService) { }

  ngOnInit() {
    this.data.get()
      .subscribe(success => {
        if (success) {
          this.categories = this.data.productCategory
          console.log(this.categories);
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].level === 3) {
              this.categoriesName[this.categoryNameCounter]
                = this.categories[i].parent.parent.name + " | "
                + this.categories[i].parent.name + " | "
                + this.categories[i].name;
              this.categoriesParentId[this.categoryNameCounter] = this.categories[i].parentId;
              this.categoryNameCounter++;
            }
          }
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].level === 2) {
              for (let j = 0; j < this.categoriesParentId.length; j++) {
                if (this.categories[i].id === this.categoriesParentId[j]) {
                  break;
                } else if (j + 1 === this.categoriesParentId.length) {
                  this.categoriesName[this.categoryNameCounter]
                    = this.categories[i].parent.name + " | "
                    + this.categories[i].name;
                  this.categoryNameCounter++;
                }
              }
            }
          }
          console.log(this.categoriesName);
        }
      })
  }


  onKey(event: any) { // without type info
    this.values += event.target.value;
    console.log(this.values)
  }

  searchProductPropery(data: any) {
    console.log(data);
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i] === "|") {
        this.searchCategory = data.substr(i + 2);
        break;
      }
    }
    this.searchCategoryModel.name = this.searchCategory;
    console.log(this.searchCategory);
    this.data.getCategory(this.searchCategoryModel)
      .subscribe(res => {
        if (res) {
          this.postProductdata.getProductAttribute(res[0].id)
            .subscribe(res => {
              if (res) {
                this.productProperties = res;
              }
            })
        }
      });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.categoriesName.filter(v => v.toLowerCase()
          .indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
