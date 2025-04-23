import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  resdata: any={};
  regForm:any;

  constructor(private myservice:HttpcallService,private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private fb:FormBuilder,
    
  ){
    
  }
  ngOnInit(): void {
    this.regForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(6)]],
      age:['',Validators.required],
      gender:['',Validators.required],
      address:['',Validators.required],
      email:['',Validators.required],
      role:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required]
  
  
      })
      console.log("constructor")
  }
  get f(){
    return this.regForm.controls;
  }
  saveUser(){
    this.myservice.saveUser(this.regForm.value).subscribe(data =>
    {
      console.log(data)
      console.log(this.regForm)
      this.resdata=data; 

      },
      (error) => {
        console.error('Error occurred while adding student:', error);
      }
    );
  }

  openDialog(): void {
    console.log('Opening dialog...');
    const dialogRef =this.dialog.open(SaveDialogComponent); // Open SaveDialogComponent
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed', result);
    });
  }

}
