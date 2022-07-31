import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';


@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {
  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$!:Observable<boolean>;

  bankForm!: FormGroup
  bankList: any[] = [];

  constructor(private fb: FormBuilder, private bankService: BankService) { }

  ngOnInit(): void {
    this.loading$=this.loading.asObservable();
    this.initForm();
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
    console.log(this.bankForm)
    this.bankService.createBank(this.bankForm.value).subscribe(res=>{
      this.bankForm.reset();
    },error =>{
      alert('Error occured when saving data.\n' + error);
    },()=>{
      console.log('completed');
    })
  }

  getList():void{
    this.bankService.getAll().subscribe(res => {
      this.bankList = res;
    });
  }

  departments = [
    { id: 3, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' }];

}
