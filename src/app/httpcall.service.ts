import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptionServiceService } from './encryption-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpcallService {
   private apiurl = '/user'
  constructor(private http:HttpClient, private encryptionService: EncryptionServiceService ) { }
  getAllUsers(){
    return this.http.get(this.apiurl +  '/getAllUsers');
  }
  saveUser(post: any){
    console.log(post)
    return this.http.post(this.apiurl + '/saveUser', post,{responseType: "text"})
  }
  updateUser(id:String,student:any){
    return this.http.put(this.apiurl + '/updateUser/' + id ,student, {responseType:"text"})
  }
  deleteUser(id: string){
    return this.http.delete(this.apiurl + '/deleteUser/' + id , {responseType:"text"})
  }
  getAllstdByPage(page:Number,student:Number,sortBy:string){
    return this.http.get<any>(this.apiurl + '/getAllstdByPage/' + page + '/' + student + '/' + sortBy)
  }
  getUserById(id:any){
    return this.http.get<any>(this.apiurl + '/getUserById/' + id)
  }
  login(post:any){
    // console.log(post)
    // const encryptedPayload = this.encryptionService.encryptData(post,'user-password');
    return this.http.post(this.apiurl + '/login',
       post,
       { responseType: 'text' });
  
  }
  getCurrentUser(username:string){
    console.log(username)
    return this.http.get<any>(this.apiurl + '/getCurrentUser/' + username )
  }
}
