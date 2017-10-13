import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

const inventorySvcEndPoint = "http://freshli-service-inventory.herokuapp.com/inventoryItems";

export class Item {
  productName: String;
  qty: Number;
  pricePerUnit: Number;
  measureUnit: String;
}

@Injectable()
export class InventoryApi {

  constructor(private http: Http) {
  }

  getAllInventory(): Promise<Array<Item>> {
    return this.http.get(inventorySvcEndPoint)
      .toPromise()
      .then((res) => {
        return res.json() as Array<Item>;
      });
  }

}
