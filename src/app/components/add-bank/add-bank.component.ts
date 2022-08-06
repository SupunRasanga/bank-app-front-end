import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css'],
})
export class AddBankComponent implements OnInit {
  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$!:Observable<boolean>;

  bankForm!: FormGroup
  bankList: any[] = [];
  isUpdate = false;
  selectedId !: number;

  constructor(private fb: FormBuilder, private bankService: BankService,
    public dialog: MatDialogRef<AddBankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


  ngOnInit(): void {
    this.loading$=this.loading.asObservable();
    this.initForm();
    this.onUpdate();
    this.getList();
  }

  initForm():void {
    this.bankForm = this.fb.group({
      bankId: ['',[Validators.required]],
      bankName: ['',[Validators.required]],
      code: ['',[Validators.required]],
      incorporateDate: ['',[Validators.required]],
      noOfStaff: ['',[Validators.required]],
      noOfBranches: ['',[Validators.required]],
      status: ['',[Validators.required]]
    })
  }

  onSaveOrUpdate():void {
    // console.log(this.bankForm)
    this.bankService.createBank(this.bankForm.value).subscribe(res=>{
      alert('Bank Registered Successfully !');
      this.bankForm.reset();
      this.getList();
    },error =>{
      alert('Error occured when saving data.\n' + error);
    },()=>{
      // console.log('completed');
    })
    // console.log(this.bankForm.value);

  }

  getList():void{
    this.bankService.getAll().subscribe(res => {
      this.bankList = res;
    });
    // console.log(this.bankList);
  }

  onClose(){
    this.getList();
  }

  onUpdate(){
    this.selectedId = this.data.bankId
      console.log(this.selectedId);
      console.log(this.data);
      this.isUpdate = true;


      this.bankForm.patchValue({
        bankId: this.data.bankId,
        bankName: this.data.bankName,
        code: this.data.code,
        incorporateDate: this.data.incorporateDate,
        noOfStaff: this.data.noOfStaff,
        noOfBranches: this.data.noOfBranches,
        status: this.data.status
      });

    // this.isUpdate = false;
    // console.log(this.bankForm.value);
    // console.log(this.selectedId);

  }

  departments = [
    { id: 3, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' }];

}
