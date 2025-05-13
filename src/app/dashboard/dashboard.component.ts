import { Component, inject, OnInit } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UpdateComponent } from '../update/update.component';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { saveAs } from 'file-saver';
import { StorageService } from '../storage.service';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { UploaddataComponent } from '../uploaddata/uploaddata.component';
import { UplodFileComponent } from '../uplod-file/uplod-file.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  email: any;
  userExists: boolean = true;
  showDownloadButton: boolean = false;
  selectedFile: File | null = null;

  constructor(private myservice :HttpcallService,private dialog: MatDialog){}
  userRole: string = '';
  resdata:any;
  lstorage=inject(StorageService)
  router=inject(Router)
  ngOnInit(): void {
    this.userRole = this.lstorage.getUserRole()|| '';
    console.log('Role loaded in dashboard:', this.userRole);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  openEmailDialog() {
    this.dialog.open(EmailDialogComponent, {
      width: '400px', // You can adjust the dialog's size
      data: { /* pass any data you want here if needed */ }
    });
  }
  onRoleChange(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement).value;

    if (selectedRole === 'admin') {
      this.router.navigate(['/dashboard/getallstudent']);
    } else if (selectedRole === 'user') {
      this.router.navigate(['/dashboard/users']);
    }
  }

  onUserExistenceChecked(exists: boolean): void {
    this.userExists = exists;
    if (!exists) {
      console.log('User does not exist. Show download options.');
    }
  }
  // onFileSelect(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  Upload() {
   this.dialog.open(UplodFileComponent,{
    width: '400px',
   });
  }

  downloadformat(format: string): void {
    console.log('Downloading in ' + format + ' format');
    // Call the API to download the corresponding file format (CSV or XLSX)
  }

  // register(){
  //   this.myservice.checkUserExist(this.email).subscribe(
  //   (exists : boolean)=>{
  //     this.userExists=exists;if (this.userExists) {

  //       alert('User exists');
  //     } else {
  //       this.showDownloadButton = true;
  //     }
  //   },
  //   (error) => {
  //     console.error('Error checking user existence:', error);
  //   }
  // );
  // }
  // downloadFormat(format: string) {
  //   const downloadUrl = `http://localhost:8080/download-file/${format}`;
  //   window.location.href = downloadUrl;
  // }
  
  
  download(){
    this.myservice.downloadexceldata().subscribe(
      data=>{
        saveAs(data, 'employee_data.xlsx');
        alert("Downloaded successfully");

      }
      
    )
  }
}

  


