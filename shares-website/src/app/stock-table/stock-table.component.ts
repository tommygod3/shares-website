import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { PurchaseStockComponent } from '../purchase-stock/purchase-stock.component';

import { Stock } from './stock';
import { StockService } from './stock.service';
import { Currency } from './currency';
import { CurrencyService } from './currency.service';
import { Transaction } from './transaction';
import { LoginComponent } from '../login/login.component';
import { User } from './user';
import { Ownership } from './ownership';
import { UserService } from './user.service';
import { LoginDetails } from './login-details';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private stockService: StockService,
    private currencyService: CurrencyService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrencies();
    this.refresh();
    this.currency = 'USD';
    this.isLoggedIn = false;
  }

  lastUpdated: string;
  stockList: Stock[];
  currencyList: Currency[];
  currency: string;
  isLoggedIn: boolean;
  username: string;
  wallet: number;
  stockOwned: Array<Ownership>;

  dataSource = new MatTableDataSource<Stock>(this.stockList);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['symbol', 'name', 'price', 'currency', 'numberAvailable', 'numberOwned'];

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
    if (!this.isLoggedIn) {
      
    }
  }

  getCurrencies(): void {
    this.currencyService.getAll().subscribe(retrievedCurrencies => {
      this.currencyList = retrievedCurrencies;
    });
  }

  showStockDetails(stock: Stock): void {
    this.stockService.get(stock.symbol).subscribe(retrievedStock => {
      this.openPurchase(retrievedStock);
    });
  }

  openPurchase(stock: Stock): void {
    const dialogRef = this.dialog.open(PurchaseStockComponent, {
      width: '20%',
      height: '50%',
      data: {
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        currency: stock.currency,
        numberAvailable: stock.numberAvailable
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body: Transaction = {
          quantity: result.quantity,
          symbol: result.symbol
        }
        //change to trans service
        console.log(body);
        //this.stockService.update(result.productCode, body).subscribe(changedStock => this.updateStockItem(changedStock));
      }
    });
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '20%',
      height: '40%',
      data: {
        action: "Login"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body: LoginDetails = {
          username: result.username,
          password: result.password
        }
        this.userService.get(result).subscribe(loggedInUser => this.updateCredentials(loggedInUser));
      }
    });
  }

  register(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '20%',
      height: '40%',
      data: {
        action: "Register"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body: LoginDetails = {
          username: result.username,
          password: result.password
        }
        this.userService.create(result).subscribe(newUser => this.updateCredentials(newUser));
      }
    });
  }

  updateCredentials(user: User): void {
    this.isLoggedIn = true;
    this.username = user.username;
    this.wallet = user.wallet;
    this.stockOwned = user.stockOwned;
    console.log(this.stockOwned);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = null;
    this.wallet = null;
    this.stockOwned = null;
  }

}
