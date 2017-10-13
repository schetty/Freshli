import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {InventoryApi} from "../../rest/inventoryApi";
import {Item} from "../../rest/inventoryApi";
import {Router} from "@angular/router";


const Fuse = require("fuse.js");
const fuseOptions = {
  keys: ['productName'],
  caseSensitive: false
};


@Component({
  selector: 'inventory',
  providers: [InventoryApi],
  styleUrls: ['inventory.component.scss'],
  templateUrl: 'inventory.component.html'


})

export class InventoryComponent implements OnInit {
  items: Array<Item>;
  displayedItems: Array<Item>;
  private searchString: string;
  private fuse;

  constructor(
    private inventoryApi: InventoryApi,
    private router: Router,
  ) {
    this.searchString = "";

  }

  updateList() {
    if (this.searchString === "") {
      this.displayedItems = this.items;
      return;
    }
    this.displayedItems = this.fuse.search(this.searchString) as Array<Item>;
  }

  ngOnInit(): void {
    this.retrieveItems();
  }

  retrieveItems() {
    this.inventoryApi.getAllInventory()
    .then(items => {
      this.items = items;
      this.displayedItems = items;
      this.fuse = new Fuse(this.items, fuseOptions);
    });
  }

  goToSaleScreen() {
    this.router.navigateByUrl("sale");
  }

}
