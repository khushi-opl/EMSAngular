import { Component, inject, OnInit } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpw',
  standalone: false,
  templateUrl: './resetpw.component.html',
  styleUrl: './resetpw.component.css'
})
export class ResetpwComponent  implements OnInit{
  newPassword = '';
  message = '';
  employeeForm:any
  response: any
  token: any;
  valid: any;
  router=inject(Router)

  constructor(private myService: HttpcallService,
     private route: ActivatedRoute, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      password: ['', Validators.required]});
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];  // Get the token from the URL query parameter
        console.log('Token:', this.token);  // Log the token to check it's being extracted correctly
      });
  }
  reset() {
    console.log(this.token)
      this.myService.forgotPassword(this.token, this.employeeForm.value['password']).subscribe((res) => {
        this.response=res;
        alert(this.response)
        this.router.navigate(['/login'])
      });
    }
  

}
