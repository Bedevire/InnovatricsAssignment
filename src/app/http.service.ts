import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SelectControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getConfig(){
    return this.httpClient.get('http://localhost:8098/swagger/v1/swagger.json');
  }


  // WatchList

  getWatchLists(succes: ( result: any ) => any){
    console.log('Getting frames');
    this.httpClient.get('http://localhost:8098/api/v1/Watchlists').subscribe(res => {      
      succes(res);
    });
  }  

  createWatchList(success: (result: any) => any){
    console.log('Watchlist created');
  }
}
