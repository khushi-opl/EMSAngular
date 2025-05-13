import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpcallService } from '../httpcall.service';
import { UploaddataComponent } from '../uploaddata/uploaddata.component';

@Component({
  selector: 'app-email-dialog',
  standalone: false,
  templateUrl: './email-dialog.component.html',
  styleUrl: './email-dialog.component.css'
})
export class EmailDialogComponent {
  emailForm: FormGroup;  // Declare the reactive form
  // @Output() closeForm = new EventEmitter<boolean>();  // Event to close the form
  userDoesNotExist: any;

  constructor(private fb: FormBuilder,private myservice :HttpcallService,private dialog: MatDialog,
    public dialogRef: MatDialogRef<EmailDialogComponent>) {
    // Initialize the form with a single email field
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Email field with validation
    });
  }

  // Handle the Cancel button click
  cancel() {
    this.dialogRef.close(false); // Close the form (no action)
  }

  // Handle the Submit button click
  submit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;

      this.myservice.checkUserExist(email).subscribe({
        next: (exists) => {
          if (exists) {
            alert('User already exists');
          } else {
            this.dialogRef.close();
            this.dialog.open(UploaddataComponent, {
              data: { email }
            });
            
          
          }
        },
        error: () => {
          alert('Error checking user existence');
        }
      });
    } else {
      console.log('Please enter a valid email');
    }
  }
}
