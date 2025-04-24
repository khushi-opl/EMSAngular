import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpw',
  standalone: false,
  templateUrl: './forgetpw.component.html',
  styleUrl: './forgetpw.component.css'
})
export class ForgetpwComponent implements OnInit {
  name: any;
  employeeForm: any;

  constructor(private myService: HttpcallService,private fb: FormBuilder) {}
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fname: ['', Validators.required]});
  }
 
  onSubmit() {
    const username = this.employeeForm.value.fname;
    this.myService.sendLink(username).subscribe(() => {
      alert('Reset link sent to email.');
    });
  }

}
