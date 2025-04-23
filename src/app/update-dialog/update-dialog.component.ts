import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-update-dialog',
  standalone: false,
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css'
})
export class UpdateDialogComponent {
  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>,
    public dialogfclose: MatDialogRef <UpdateComponent>
    ) {}
  onClose(): void {
    this.dialogRef.close(); 
    console.log("update-dialog closed")
    this.dialogfclose.close();
    console.log("updatecomponent closed")
  }

}
