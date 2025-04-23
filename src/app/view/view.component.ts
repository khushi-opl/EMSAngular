import { Component, Inject } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent { profile: any;
  id: any;

  constructor(private myservice: HttpcallService, private route: ActivatedRoute,
     @Inject(MAT_DIALOG_DATA) public data: any,) {}

  ngOnInit(): void {
    
    this.id =this.data.id;
    console.log('Student ID:', this.id);
    if (this.id) {
    this.myservice.getUserById(this.id).subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (err) => {
        console.error('Error fetching profile data', err);
      }
    });
}
  }
}
