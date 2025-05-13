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
  profile: any;
  selectedImage: File | null = null;

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
      gender: ['', Validators.required],
      dob: ['' ,Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      contactNumber:['',Validators.required],
      pinCode:[{value:'',disabled:true},Validators.required],
  
    });
    this.route.paramMap.subscribe(params =>  {
  
      console.log(this.studentId)
      this.myservice.getUserById(this.studentId).subscribe(data => {
      this.regForm.patchValue(data);
      this.profile = data;
      console.log(data)
      console.log(this.data.id)
      });
    });
  }
  getInitials(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(' ');
    let initials = words[0]?.charAt(0).toUpperCase();
    if (words.length > 1) {
      initials += words[1]?.charAt(0).toUpperCase();
    }
    return initials;
  }
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.fileData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  updateUser(): void {
    const formData = new FormData();
   
    const formValue = {
      ...this.regForm.getRawValue(), // disabled `id`
    };
    const employeeBlob = new Blob([JSON.stringify(formValue)], { type: 'application/json' });
    formData.append('user', employeeBlob);
    if (this.selectedImage) {
      formData.append('profileImage', this.selectedImage);
    }
    else {
     const emptyBlob = new Blob([], { type: 'application/octet-stream' });
     formData.append('profileImage', emptyBlob);
}
    this.myservice.updateUser(this.studentId, formData).subscribe(
      (data) => {
        console.log(data)
      this.updatedata=data
        this.dialogRef.close(data);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
  
  // updateUser(student:any){
    
  //     this.myservice.updateUser(this.studentId ,this.regForm.value).subscribe(data=>
  //     {
  //     console.log(data)
  //     this.updatedata=data
  //     // this.dialog.open(UpdateDialogComponent);
  //     }
  //     );
  //     }
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
