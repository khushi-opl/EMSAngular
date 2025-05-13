import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpcallService } from '../httpcall.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-uploaddata',
  standalone: false,
  templateUrl: './uploaddata.component.html',
  styleUrls: ['./uploaddata.component.css'],
})
export class UploaddataComponent {
  selectedType: 'single' | 'bulk' | null = null;
  selectedFormat: 'csv' | 'xlsx' = 'csv';
  singleUserForm: any;
  selectedFile: File | null = null;
  resdata: any={};
  profile: any;
  selectedImage: File | null = null;
  selectedImagePreview: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private fb: FormBuilder,private myservice:HttpcallService,
    public dialogRef: MatDialogRef<UploaddataComponent>
  ) {
    // Initialize form for single user
    this.singleUserForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      username: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['male', [Validators.required]],
      address: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
      ],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      pinCode: [''],
      role: ['', [Validators.required]],
    });
  }

  // Handles user type selection (single or bulk)
  onTypeSelect(type: 'single' | 'bulk') {
    this.selectedType = type;
    // Reset the form when switching types
    if (type === 'single') {
      this.singleUserForm.reset();
    } else if (type === 'bulk') {
      this.selectedFile = null;  // Reset file selection when switching to bulk
    }
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
       this.selectedImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
     else {
    this.selectedImage = null;
    this.selectedImagePreview = null;
     }
  }

  // Handles the form submission for single user
  submitUserForm() {
    if (this.singleUserForm.valid) {
   
    const formData = new FormData();
  
    // Append form values
    const formValue = {
      ...this.singleUserForm.getRawValue(), // includes disabled `id`
    };
    const employeeBlob = new Blob([JSON.stringify(formValue)], { type: 'application/json' });
    formData.append('user', employeeBlob);
  
    // Append the profile image if selected
    if (this.selectedImage) {
      formData.append('profileImage', this.selectedImage);
    }
     else {
           const emptyBlob = new Blob([], { type: 'application/octet-stream' });
            formData.append('profileImage', emptyBlob);
}
    console.log(formData)
    // Call the service to update the user
    this.myservice.saveUser( formData).subscribe(
      (res) => {
        // Close the dialog with the response data
        this.dialogRef.close(res);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
  

  // Proceed button handling for both types
  proceed() {
    console.log('Email:', this.data.email);
    console.log('Selected Type:', this.selectedType);

    this.myservice.downloadexcelformat(this.selectedFormat).subscribe(

          data=>{
            if(this.selectedFormat){
              saveAs(data, 'User_blank_format.' + this.selectedFormat);
              alert("Downloaded successfully");
              this.dialogRef.close(UploaddataComponent)

            }
            else{
              saveAs(data, 'User_blank_format.' + this.selectedFormat);
              alert("Downloaded successfully");
              this.dialogRef.close(UploaddataComponent)

            }
           
          }
          
        )
  }

  // File input handler for bulk user file selection
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Selected File:', this.selectedFile);
    }
  }
  addUser(){
    this.myservice.saveUser(this.singleUserForm.value).subscribe(data =>
      {
        console.log(data)
        console.log(this.singleUserForm)
        this.resdata=data; 
        this.dialogRef.close();
  
      });
    
      }
    

  // Close the dialog without any action
  oncancel() {
    this.dialogRef.close();
  }
}
