import {Component} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {SaleLot} from "../../rest/salesApi";
import {SalesApi} from "../../rest/salesApi";
import {Router} from "@angular/router";

@Component({
  selector: 'sale',
  providers: [SalesApi],
  styleUrls: ['./sale.component.scss'],
  templateUrl: './sale.component.html'
})
export class SaleComponent {
  private saleForm;
  private sending = false;

  constructor(
    private salesApi : SalesApi,
    private router: Router
  ) {
    this.saleForm = {};
  }

  submitSale() : void {
    this.sending = true;

    let saleLot = new SaleLot();
    saleLot.productName = this.saleForm.productName;
    saleLot.qty = this.saleForm.qty;
    saleLot.measureUnit = this.saleForm.measureUnit;
    saleLot.pricePerUnit = this.saleForm.pricePerUnit;

    this.salesApi.createSale(saleLot)
    .then(
      () => { this.sending = false; this.navigateHome(); },
      (err) => { this.sending = false; }
    );
  }

  navigateHome() {
    this.router.navigateByUrl("/");
  }

}
