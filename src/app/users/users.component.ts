import { Component } from '@angular/core';
import { UpdateComponent } from '../update/update.component';
import { ViewComponent } from '../view/view.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpcallService } from '../httpcall.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent { resdata: any;
  deletedata:any;
  updatedata: any;
  studentId: any;
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  data: any;
  studentlist: any[] =[];
  totalPagesArray: number[]= [];
  totalPages: number = 0;
  sortBy: string = 'username'; 
  profile: any;
  searchform: any;
  constructor(private myservice:HttpcallService,private dialog: MatDialog,private fb:FormBuilder){
    this.getAllstdByPage(this.currentPage);
    console.log("constructor")
    
  }
  ngOnInit(): void {
    this.searchform = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['', Validators.required], 
      email: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      role:[{value:'',disabled:true},Validators.required],
      
    });
  }
  getAllstdByPage(current:number){
        console.log('Fetching data with sortBy:', this.sortBy);
         this.myservice.getUsers(current,this.pageSize,this.sortBy).subscribe(data =>{
          console.log(data.content)
          this.studentlist=data.content;
          this.currentPage=data.pageable.pageNumber + 1;
          this.totalPages=data.totalPages;
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.profile = data;
        });
        // console.log(this.studentlist)
  }   
    sortTable(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    console.log('SortBy changed to:', this.sortBy);
    this.getAllstdByPage(this.currentPage);
  }
  searchStudents() {
    this.currentPage=1
    this.totalPages=0
    this.myservice.search(this.currentPage,this.pageSize,this.searchform.value.name).subscribe(data =>{
      console.log(data)
      console.log(data.content)
      this.studentlist=data.content;
      this.currentPage=data.pageable.pageNumber + 1;
      this.totalPages=data.totalPages;
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.profile = data;

    });
  }
  resetSearch() {
    this.searchform.reset();
    this.studentlist = [];
    this.getAllstdByPage(this.currentPage);
  }

  delete(id:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        data:{id:id}
      }
    );
  dialogRef.afterClosed().subscribe(result => {
    if (result) { 
      this.myservice.deleteUser(id).subscribe(
        data => {
          console.log('Student deleted:', data);
          this.getAllstdByPage(this.currentPage); 
                },
        error => {
          console.error('Error deleting student:', error);
        }
      );
    } else {
      console.log('Deletion canceled');
    }
  });
}


View(id:any){
  const dialogopen=this.dialog.open(ViewComponent,{
    data: {id:id}
    

   });  

}
  
 update(id:any){

           const dialogopen=this.dialog.open(UpdateComponent,{
            data: {id:id}

           });  
           dialogopen.afterClosed().subscribe(()=>{
            this.getAllstdByPage(this.currentPage);
            
           })
          
          }

        }
