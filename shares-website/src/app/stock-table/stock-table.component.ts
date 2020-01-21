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
import { PurchaseService } from './purchase.service';
import { SellService } from './sell-service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private stockService: StockService,
    private currencyService: CurrencyService,
    private userService: UserService,
    private purchaseService: PurchaseService,
    private sellService: SellService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrencies();
    this.currency = 'USD';
    this.refresh();
  }

  lastUpdated: string;
  stockList: Stock[];
  currencyList: Currency[];
  currency: string;
  user: User;

  dataSource = new MatTableDataSource<Stock>(this.stockList);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['symbol', 'name', 'price', 'currency', 'numberAvailable', 'numberOwned'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.stockService.getAll(this.currency).subscribe(retrievedStock => {
      this.stockList = retrievedStock;
      this.stockList.forEach(stock => {
        stock.numberOwned = this.getOwnership(stock.symbol);
      });
      this.dataSource = new MatTableDataSource<Stock>(this.stockList);
      this.dataSource.sort = this.sort;
    });
    this.lastUpdated = new Date().toLocaleString();
  }

  getOwnership(symbol: string): number {
    if (!this.user) {
      return 0;
    }
    let found = 0;
    this.user.stockOwned.forEach(stock => {
      if (stock.symbol == symbol) {
        found = stock.amountOwned;
      }
    });
    if (found == 0) {
      return 0;
    }
    else {
      return found;
    }
  }

  getCurrencies(): void {
    this.currencyService.getAll().subscribe(retrievedCurrencies => {
      this.currencyList = retrievedCurrencies;
    });
  }

  showStockDetails(stock: Stock): void {
    this.stockService.get(stock.symbol).subscribe(retrievedStock => {
      retrievedStock.numberOwned = this.getOwnership(retrievedStock.symbol);
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
        numberAvailable: stock.numberAvailable,
        numberOwned: stock.numberOwned
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body: Transaction = {
          quantity: +result.quantity,
          symbol: result.symbol
        }
        if (result.selling) {
          this.sellService.create(this.user, body).subscribe(updatedUser => this.updateUser(updatedUser, this.user.password));
        }
        else {
          this.purchaseService.create(this.user, body).subscribe(updatedUser => this.updateUser(updatedUser, this.user.password));
        }
      }
    });
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '15%',
      height: '30%',
      data: {
        action: 'Login'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body: LoginDetails = {
          username: result.username,
          password: result.password
        }
        this.userService.get(result).subscribe(loggedInUser => this.updateUser(loggedInUser, result.password));
      }
    });
  }

  register(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '15%',
      height: '30%',
      data: {
        action: 'Register'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body: LoginDetails = {
          username: result.username,
          password: result.password
        }
        this.userService.create(result).subscribe(newUser => this.updateUser(newUser, result.password));
      }
    });
  }

  updateUser(user: User, password: string): void {
    this.user = user;
    if (password) {
      this.user.password = password;
    }
    this.refresh();
    
  }

  logout(): void {
    this.user = null;
  }

}
