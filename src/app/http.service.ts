import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SelectControlValueAccessor } from '@angular/forms';
import { WatchList } from './dal/watchlist';
import { HttpHeaders } from '@angular/common/http';
import { WatchListMember } from './dal/watchlistmember';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getConfig(){
    return this.httpClient.get('http://localhost:8098/swagger/v1/swagger.json');
  }


  // WatchList

  getWatchLists(): Observable<any> {    
    return this.httpClient.get('http://localhost:8098/api/v1/Watchlists');
  } 

  createWatchList(watchList: WatchList, success: (result: any) => any){
    watchList.previewColor = '#aaaaaa';    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.httpClient.post('http://localhost:8098/api/v1/Watchlists', watchList, httpOptions).subscribe(res => {
      success(res);
    });
  }


  // WatchList Members
  getWatchListMembers(): Observable<any>{
    return this.httpClient.get('http://localhost:8098/api/v1/WatchlistMembers');
  }

  createWatchListMember(watchListMember: WatchListMember){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.httpClient.post('http://localhost:8098/api/v1/WatchlistMembers', watchListMember, httpOptions).subscribe(res =>{
      console.log('WatchList member Created');
      window.location.reload();
    });
  }
}
