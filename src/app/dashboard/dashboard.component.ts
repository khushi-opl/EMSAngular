import { Component, inject, OnInit } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UpdateComponent } from '../update/update.component';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { saveAs } from 'file-saver';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private myservice :HttpcallService){}
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
  download(){
    this.myservice.downloadexceldata().subscribe(
      data=>{
        saveAs(data, 'employee_data.xlsx');
        alert("Downloaded successfully");

      }
      
    )
  }
}

  


