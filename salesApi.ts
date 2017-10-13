import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

const salesSvcEndPoint = "http://freshli-service-inventory.herokuapp.com/inventoryItems";

export class SaleLot {
  productName: String;
  pricePerUnit: Number;
  measureUnit: String;
  qty: Number;
}

@Injectable()
export class SalesApi {

  constructor(private http: Http) {}

  createSale(saleLot: SaleLot) : Promise<void> {
    return this.http.post(salesSvcEndPoint, saleLot)
      .toPromise()
      .then(res => {});
  }
}
