import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { NbDialogService } from '@nebular/theme';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

var TREE_DATA = {}
const UPDATED_TREE_DATA = TREE_DATA;

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    //const data = this.buildFileTree(UPDATED_TREE_DATA, 0);
    //console.log(UPDATED_TREE_DATA)

    // Notify the change.
    // this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;

        }
      }
      console.log(node.item)
      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ChecklistDatabase]
})
export class ProductComponent implements OnInit {

  public categories = [];
  subCategory: any = {};

  ngOnInit() {
    this.productCategoryService.get()
      .subscribe(success => {
        if (success) {
          this.categories = this.productCategoryService.productCategory
          console.log(this.categories);
          for (let index = 0; index < this.categories.length; index++) {
            if (this.categories[index].level === 2) {
              TREE_DATA[this.categories[index].name] = {}
              for (let j = 0; j < this.categories.length; j++) {
                if (this.categories[j].parentId === this.categories[index].id) {
                  TREE_DATA[this.categories[index].name][this.categories[j].name] = []
                }
              }
            }
          }
          console.log(TREE_DATA)
          const data = this._database.buildFileTree(UPDATED_TREE_DATA, 0);
          this._database.dataChange.next(data);
        }
      })
  }

  async createCategory() {
    this.subCategory.parentId = null;
    this.subCategory.level = 1;

    await this.dialogService.open(ModalComponent)
      .onClose.subscribe(name => {
        if (name != null) {
          this.subCategory.name = name;
          this.productCategoryService.register(this.subCategory)
            .subscribe(res => {
              console.log(res);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate(["/pages/category/product"]));
            }, (err) => {
              console.log(err);
            });
        }
      });
  }

  /**
   * Called when plus button next to main category is called
   * return: create a subcategory.
   */
  async createSubCategory(subCategory: string) {
    console.log(subCategory);
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === subCategory) {
        this.subCategory.parentId = this.categories[i].id;
        this.subCategory.level = this.categories[i].level + 1;
      }
    }
    await this.dialogService.open(ModalComponent)
      .onClose.subscribe(name => {
        if (name != null) {
          this.subCategory.name = name;
          this.productCategoryService.register(this.subCategory)
            .subscribe(res => {
              console.log(res);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate(["/pages/category/product"]));
            }, (err) => {
              console.log(err);
            });
        }
      });
  }

  /**
   * Open modal to add sub category.
   **/
  async open(node: TodoItemFlatNode) {
    console.log(node);
    var parentId: any;
    var level: number;

    /**
     * loop through the categories and check which node is selected.
     **/
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === node.item) {
        parentId = this.categories[i].id;
        level = this.categories[i].level + 1;
        this.subCategory.parentId = parentId;
        this.subCategory.level = level;
      }
    }

    /**
     * Wait till the user submit the name of the sub category and register 
     * it to the db.
     **/
    await this.dialogService.open(ModalComponent)
      .onClose.subscribe(name => {
        if (name != null) {
          this.subCategory.name = name;
          this.productCategoryService.register(this.subCategory)
            .subscribe(res => {
              console.log(res);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate(["/pages/category/product"]));
            }, (err) => {
              console.log(err);
            });
        }
      });
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private productCategoryService: ProductCategoryService,
    private _database: ChecklistDatabase,
    private dialogService: NbDialogService,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */