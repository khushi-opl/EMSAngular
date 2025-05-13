import { HttpClient, HttpParams } from '@angular/common/http';
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
  saveUser(formData: FormData){
    console.log(formData)
    return this.http.post(this.apiurl + '/saveUser', formData,{responseType: "text"})
  }
  updateUser(id:String,formData: FormData){
    console.log(formData)
    return this.http.put(this.apiurl + '/updateUser/' + id ,formData, {responseType:"text"});
  }
  deleteUser(id: string){
    return this.http.delete(this.apiurl + '/deleteUser/' + id , {responseType:"text"})
  }
  getUsers(page:Number,student:Number,sortBy:string){
    return this.http.get<any>(this.apiurl + '/getUsers/' + page + '/' + student + '/' + sortBy)
  }
  forgotPassword(token: string, newPassword: string) {
    return this.http.post( this.apiurl + `/forgotPassword/${token}`, {"password": newPassword}, {responseType:"text"});
  }
  sendLink(name: string) {
    return this.http.get( this.apiurl +'/sendLink/'+ name, {responseType:"text"} );
  }
    getAllstdByPage(page:Number,student:Number,sortBy:string){
    return this.http.get<any>(this.apiurl + '/getAllstdByPage/' + page + '/' + student + '/' + sortBy)
  }
  search(page:Number,student:Number,name:string){
    return this.http.get<any>(this.apiurl + '/search/' + page + '/' + student + '/' + name)
  }
  downloadexceldata(){
    return this.http.get(this.apiurl + '/downloadexceldata', {responseType: 'blob'});
  }
  checkUserExist(email:any){
    return this.http.get<any>(this.apiurl + '/checkUserExist/' + email)
  }
  
  getUserById(id:any){
    return this.http.get<any>(this.apiurl + '/getUserById/' + id)
  }
  downloadexcelformat(format:String){
    return this.http.get(this.apiurl + '/download-excel-format/' + format, {responseType: 'blob'});
  }
  dumpexceldata(filedata: FormData){
    return this.http.post(this.apiurl + '/dump-excel-data', filedata)

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
