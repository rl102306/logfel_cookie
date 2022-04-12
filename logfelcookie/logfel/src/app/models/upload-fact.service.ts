import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UploadFactService {

  
  constructor(private http: HttpClient) { }

  
  public Upload_File(fact_file: any,token:any) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token '+ token
      })
    };
    
    // FU = File Upload
    return this.http.post<any>(`${environment.API_URL}/api/fu/post`,fact_file,httpOptions)
    
  }

  public postfile(formData:any,token:any){

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token '+ token,
        'Content-Type': 'application/json'
      })
    };
  

    return this.http.post<any>(`${environment.API_URL}/api/posicion/post`,formData);
    
  }

}
