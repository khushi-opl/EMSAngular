import { Component } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-uplod-file',
  standalone: false,
  templateUrl: './uplod-file.component.html',
  styleUrl: './uplod-file.component.css'
})
export class UplodFileComponent {

  selectedFile: File | null = null;
  constructor(private myservice :HttpcallService,private dialog: MatDialog){}

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }
    clearFile() {
    this.selectedFile = null;
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) input.value = '';
  }

  Upload() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
  formData.append('filedata', this.selectedFile);

  this.myservice.dumpexceldata(formData).subscribe({
    next: (res: any) => {
      alert(res.status || 'File uploaded and saved successfully!');
      console.log(res);
      this.dialog.closeAll();
    },
    error: (err) => {
       let errorMsg = err.error?.error || 'Upload failed. Please check the file.';
       console.log(errorMsg)
    //      const errorParts = errorMsg.split(':');
    //      if (errorParts.length >= 3) {
    //          errorMsg = `${errorParts[0]}: ${errorParts[4].trim()}: `;
    //     } else {
    //          errorMsg = errorParts[0]; 
    // }

        alert(errorMsg);
     
    }
  });

  }
}

//   selectedFile: File | null = null;
//   isDragOver = false;

//   constructor(private myservice: HttpcallService, private dialog: MatDialog) {}

//   onFileSelect(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   onFileDrop(event: DragEvent) {
//     event.preventDefault();
//     this.isDragOver = false;

//     if (event.dataTransfer && event.dataTransfer.files.length > 0) {
//       const file = event.dataTransfer.files[0];
//       if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
//         this.selectedFile = file;
//       } else {
//         alert('Only .xls and .xlsx files are accepted.');
//       }
//     }
//   }

//   onDragOver(event: DragEvent) {
//     event.preventDefault();
//     this.isDragOver = true;
//   }

//   onDragLeave(event: DragEvent) {
//     this.isDragOver = false;
//   }

//   clearFile() {
//     this.selectedFile = null;
//     // Optionally reset input if needed
//     const input = document.getElementById('file-upload') as HTMLInputElement;
//     if (input) input.value = '';
//   }

//   Upload() {
//     if (!this.selectedFile) {
//       alert('Please select a file first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('filedata', this.selectedFile);

//     this.myservice.dumpexceldata(formData).subscribe({
//       next: (res: any) => {
//         alert(res.status || 'File uploaded and saved successfully!');
//         console.log(res);
//         this.dialog.closeAll();
//       },
//       error: (err) => {
//         let errorMsg = err.error?.error || 'Upload failed. Please check the file.';
//         console.log(errorMsg);
//         alert(errorMsg);
//       }
//     });
//   }
// }
