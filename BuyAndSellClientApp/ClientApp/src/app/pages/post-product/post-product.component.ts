import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/service/product-category.service';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
  //formatter = (result: string) => result.toUpperCase();

  constructor(private data: ProductCategoryService) { }

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

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.categoriesName.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
