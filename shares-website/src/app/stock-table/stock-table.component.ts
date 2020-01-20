import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Stock } from './stock';
import { StockService } from './stock.service';
import { Currency } from './currency';
import { CurrencyService } from './currency.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private stockService: StockService,
    private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies();
    this.refresh();
    this.currency = 'USD';
  }

  lastUpdated: string;
  stockList: Stock[];
  currencyList: Currency[];
  currency: string;

  dataSource = new MatTableDataSource<Stock>(this.stockList);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['symbol', 'name', 'price', 'currency', 'numberAvailable'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.stockService.getAll(this.currency).subscribe(retrievedStock => {
      this.stockList = retrievedStock;
      this.dataSource = new MatTableDataSource<Stock>(this.stockList);
      this.dataSource.sort = this.sort;
    });
    this.lastUpdated = new Date().toLocaleString();
  }

  getCurrencies() {
    this.currencyService.getAll().subscribe(retrievedCurrencies => {
      this.currencyList = retrievedCurrencies;
    });
  }

}
