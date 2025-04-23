import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { HttpcallService } from '../httpcall.service';
import { EncryptionServiceService } from '../encryption-service.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: any;
  username: string = '';
  password: string = '';
  role: string = '';
  captchaQuestion: string = '';
  correctAnswer: number = 0;
  
  

  constructor(
    private fb: FormBuilder,
    // private storageService: StorageService,  
    private router: Router,
    private myservice:HttpcallService,
    // private encryptionService: EncryptionServiceService
    
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captchaAnswer:['',Validators.required]
    });
    this.generateCaptcha();
  }
  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    this.correctAnswer = num1 + num2;
    this.captchaQuestion = `${num1} + ${num2}`;
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const userCaptcha = parseInt(this.loginForm.value.captchaAnswer, 10);
    // console.log('Form Data:', formData);
    // const payload = {
    //   username: formData.username,
    //   password: formData.password,
    //   // role: this.role 
    // };
    // console.log('Payload:', payload);
    // const encryptedPayload = this.encryptionService.encryptData(payload,'user-password');
    // console.log('Encrypted Payload:', encryptedPayload);
    // const userCaptcha = parseInt(this.loginForm.value.captchaAnswer, 10);
    if (userCaptcha !== this.correctAnswer) {
      alert('CAPTCHA failed. Try again.');
      this.loginForm.controls['captchaAnswer'].reset(); // clear answer
      this.generateCaptcha(); // new question
      return;
    }
    this.myservice.login(this.loginForm.value).subscribe(
      data=>{
      const res=JSON.parse(data)
      console.log(data)

      localStorage.setItem('token',res.token)
      localStorage.setItem('username',res.username)
      localStorage.setItem('role',res.role)
      this.router.navigate(['/dashboard']);

    },
    (error) => {
      console.error('Login failed', error);
      alert('Invalid username or password');
    }
    )
  }

}


