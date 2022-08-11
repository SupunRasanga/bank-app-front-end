import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddBankComponent } from '../add-bank/add-bank.component';
import { BankService } from 'src/app/services/bank.service';
import { BankModel } from '../models/bank-model';
import {MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private bankService: BankService) { }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) empTbSort = new MatSort();


  displayedColumns: string[] = ['bankId', 'bankName', 'code', 'incorporateDate','noOfStaff','noOfBranches','status','filter','add'];
  dataSource !: MatTableDataSource<any>;
  bankList : BankModel[] = [];
  isSearch = false;


  ngOnInit(): void {
    this.getList();
    this.isSearch=false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(AddBankComponent, {
      width: '50%',
      data: ''
    });
   this.dialog.afterAllClosed.subscribe(res => {
      this.getList();
   });
  }

  getList():void{
    this.bankService.getAll().subscribe(res => {
      // this.bankList = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;
    });
  }

  onDelete(bankId: number){
    let isConfirm : boolean=confirm('Are you want to delete this Record?');

    if(isConfirm){
      this.bankService.deleteBank(bankId).subscribe(res => {
        this.getList();
      })
    }

  }

  onUpdate(bank: BankModel){
    this.dialog.open(AddBankComponent, {
      width: '50%',
      data: {Bank: bank},
    });
    this.dialog.afterAllClosed.subscribe(res => {
      this.getList();
   });
  }

  onSearch(){
    this.isSearch = true;
  }

}

