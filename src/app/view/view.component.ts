import { Component, Inject } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent { profile: any;
  id: any;
  regForm:any;

  constructor( private route: ActivatedRoute,
    private myservice:HttpcallService,
     private dialog : MatDialog,
     private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}

  ngOnInit(): void {
    this.id =this.data.id;
    this.regForm = this.fb.group({
      sid:[{value:this.id,disabled:true}],
      username: [{value:'',disabled:true}, [Validators.required]],
      gender: ['', Validators.required],
      dob: [{value:'',disabled:true}, Validators.required],
      address: [{value:'',disabled:true}, Validators.required],
      email: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      password: [{value:'',disabled:true}, Validators.required],
      role:[{value:'',disabled:true},Validators.required],
      contactNumber:[{value:'',disabled:true},Validators.required],
      pinCode:[{value:'',disabled:true},Validators.required],
    });
    
    this.route.paramMap.subscribe(params =>  {
  
      console.log(this.id)
      this.myservice.getUserById(this.id).subscribe(data => {
      this.regForm.patchValue(data);
      this.profile = data;
      console.log(data)
      console.log(this.data.id)
      });
    });
    
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
}
