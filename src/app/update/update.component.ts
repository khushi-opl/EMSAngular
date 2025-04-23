import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpcallService } from '../httpcall.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  updatedata: any;
  studentId: any;
  regForm:any;
  studentData: any = {}; 

  constructor(private route: ActivatedRoute,
    private myservice:HttpcallService,
     private dialog : MatDialog,
     private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>){
    console.log("constructor")
  }

  ngOnInit(): void {
    this.studentId =this.data.id;
    this.regForm = this.fb.group({
      sid:[{value:this.studentId,disabled:true}],
      username: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      role:['',Validators.required]
    });
    this.route.paramMap.subscribe(params =>  {
  
      console.log(this.studentId)
      this.myservice.getUserById(this.studentId).subscribe(data => {
      this.regForm.patchValue(data);
      console.log(data)
      console.log(this.data.id)
      });
    });
  }
  updateUser(student:any){
      this.myservice.updateUser(this.studentId ,this.regForm.value).subscribe(data=>
      {
      console.log(data)
      this.updatedata=data
      // this.dialog.open(UpdateDialogComponent);
      }
      );
      }
   openDialog(): void {
      console.log('Opening dialog...');
      const dialogRef =this.dialog.open(UpdateDialogComponent,{
        data:{id:this.studentId},
       
      }); 

      dialogRef.afterClosed().subscribe(() => {
        console.log('Dialog was closed');
        this.dialogRef.close();
        
      });
    }

}
