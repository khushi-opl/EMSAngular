import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-dialog',
  standalone: false,
  templateUrl: './save-dialog.component.html',
  styleUrl: './save-dialog.component.css'
})
export class SaveDialogComponent {

  constructor(public dialogRef: MatDialogRef<SaveDialogComponent>, private router: Router,) {}
  onClose(): void {
    this.router.navigate(['/login'])
    this.dialogRef.close(); 
   
  }

}
