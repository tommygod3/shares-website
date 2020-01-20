import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Stock } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.getAllStock();
  }

  lastUpdated: string;
  stock: Stock[];

  dataSource = new MatTableDataSource<Stock>(this.stock);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['symbol', 'name', 'price', 'currency', 'numberAvailable'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllStock() {
    this.stockService.getAll().subscribe(retrievedStock => {
      this.stock = retrievedStock;
      this.dataSource = new MatTableDataSource<Stock>(this.stock);
      this.dataSource.sort = this.sort;
    });
    this.lastUpdated = new Date().toLocaleString();
  }

}
