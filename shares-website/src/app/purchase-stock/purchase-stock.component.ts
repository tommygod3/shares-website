import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  symbol: string;
  name: string;
  price: number;
  currency: string;
  numberAvailable: number;
  numberOwned: number;
  quantity: number;
}

@Component({
  selector: 'app-purchase-stock',
  templateUrl: './purchase-stock.component.html',
  styleUrls: ['./purchase-stock.component.css']
})
export class PurchaseStockComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PurchaseStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
