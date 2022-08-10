import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';
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
  }

  initForm():void {
    this.bankForm = this.fb.group({
      bankId: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      bankName: ['',[Validators.required]],
      code: ['',[Validators.required]],
      incorporateDate: ['',[Validators.required]],
      noOfStaff: ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      noOfBranches: ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      status: ['',[Validators.required]]
    })
  }

  onSaveOrUpdate():void {
    if(this.bankForm.invalid){
        alert('Please fill required feilds !')
    }else{
      if(this.isUpdate == true){
        this.bankService.updateBank(this.selectedId, this.bankForm.value).subscribe(res => {
          alert('Bank Update Successfully !');
          this.bankForm.reset();
          this.dialog.close();
        })
      }else{

        this.bankService.createBank(this.bankForm.value).subscribe(res=>{
          alert('Bank Registered Successfully !');
          this.bankForm.reset();
          this.dialog.close();
        },error =>{
          alert('Error occured when saving data.\n' + error);
        },()=>{
        })

      }
    }


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
    if(this.data.Bank != null){
      this.selectedId = this.data.Bank.bankId

      this.isUpdate = true;

      this.bankForm.patchValue({
        bankId: this.data.Bank.bankId,
        bankName: this.data.Bank.bankName,
        code: this.data.Bank.code,
        incorporateDate: this.data.Bank.incorporateDate,
        noOfStaff: this.data.Bank.noOfStaff,
        noOfBranches: this.data.Bank.noOfBranches,
        status: this.data.Bank.status
      });

    }else{
      this.isUpdate = false;
    }

  }

}
