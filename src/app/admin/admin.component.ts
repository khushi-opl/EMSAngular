import { Component, OnInit } from '@angular/core';
import { HttpcallService } from '../httpcall.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  profile: any;
  username: string = '';
  // profileImageUrl: string | null = null;
  constructor(private userService: HttpcallService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (this.username) {
      this.userService.getCurrentUser(this.username).subscribe({
        next: (data) => {
          this.profile = data;
          // this.profileImageUrl = data.profile_image;
        },
        error: (err) => {
          console.error('Error fetching profile data', err);
        }
      });
    }
  }
}