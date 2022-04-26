import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API Url
  baseApiUrl: string = "http://www.file.io/";

  constructor(private httpClient: HttpClient) { }

  upload(file: File):Observable<any>{    
    const formData = new FormData();
    formData.append("file", file, file.name);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': this.baseApiUrl
      })
    };

    return this.httpClient.post(this.baseApiUrl, formData, httpOptions);
  }
}
