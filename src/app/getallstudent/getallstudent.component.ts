import { Component } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UpdateComponent } from '../update/update.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-getallstudent',
  standalone: false,
  templateUrl: './getallstudent.component.html',
  styleUrl: './getallstudent.component.css'
})
export class GetallstudentComponent { resdata: any;
  deletedata:any;
  updatedata: any;
  studentId: any;
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  data: any;
  studentlist: any[] =[];
  totalPagesArray: number[]= [];
  totalPages: number = 0;
  sortBy: string = 'username'; 
  constructor(private myservice:HttpcallService,private dialog: MatDialog){
    this.getAllstdByPage(this.currentPage);
    console.log("constructor")
    
  }
  getAllstdByPage(current:number){
        console.log('Fetching data with sortBy:', this.sortBy);
         this.myservice.getAllstdByPage(current,this.pageSize,this.sortBy).subscribe(data =>{
          console.log(data.content)
          this.studentlist=data.content;
          this.currentPage=data.pageable.pageNumber + 1;
          this.totalPages=data.totalPages;
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        });
        // console.log(this.studentlist)
  }   
    sortTable(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    console.log('SortBy changed to:', this.sortBy);
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

  



