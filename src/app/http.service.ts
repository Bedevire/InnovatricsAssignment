import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { EMPTY, empty, of } from "rxjs";
import { from } from 'rxjs';
import { SelectControlValueAccessor } from '@angular/forms';
import { WatchList } from './dal/watchlist';
import { HttpHeaders } from '@angular/common/http';
import { WatchListMember } from './dal/watchlistmember';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  // WatchList
  getWatchLists(): Observable<any> {    
    return this.httpClient.get('http://localhost:8098/api/v1/Watchlists');
  } 

  createWatchList(watchList: WatchList){
    watchList.previewColor = '#aaaaaa';    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.httpClient.post('http://localhost:8098/api/v1/Watchlists', watchList, httpOptions);
  }

  deleteWatchList(id: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.httpClient.delete('http://localhost:8098/api/v1/Watchlists/' + id);
  }


  // WatchList Members
  getWatchListMembers(): Observable<any>{
    return this.httpClient.get('http://localhost:8098/api/v1/WatchlistMembers');
  }

  getWatchListRegistrations(watchListId: string): Observable<any>{
    return this.httpClient.get('http://localhost:8098/api/v1/Watchlists/' + watchListId + '/WatchlistMembers');
  }

  createWatchListMember(watchListMember: WatchListMember){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };    

    return this.httpClient.post('http://localhost:8098/api/v1/WatchlistMembers', watchListMember, httpOptions);
  }

  deleteWatchListMember(id: string){
    return this.httpClient.delete('http://localhost:8098/api/v1/WatchlistMembers/' + id);
  }

  registerMemberToWatchList(memberId: string, watchListId: string, imageFile: File){
    
    var self = this;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    var imageData: string = "";
    const reader = new FileReader();

    reader.addEventListener('load', function(){
      if(reader.result != null){
        imageData = reader.result as string;
        imageData = imageData.substring(imageData.indexOf('base64') + 7)        
    
        var json: any = {
          "id": memberId,
          "images": [
            {
              "faceId": "",
              "data": imageData
            }
          ],
          "watchlistIds": [
            watchListId
          ],
          "faceDetectorConfig": {
            "minFaceSize": 35,
            "maxFaceSize": 600,
            "maxFaces": 20,
            "confidenceThreshold": 450
          },
          "faceDetectorResourceId": "cpu",
          "templateGeneratorResourceId": "cpu",
          "keepAutoLearnPhotos": false
        }
    
        self.httpClient.post('http://localhost:8098/api/v1/WatchlistMembers/Register', json, httpOptions).subscribe((result2: any) => {          
          window.location.reload();
        });
      }
    }, false);
    
    if(imageFile){
      reader.readAsDataURL(imageFile);
    }
  }

  searchWatchList(json: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.httpClient.post('http://localhost:8098/api/v1/Watchlists/Search', json, httpOptions);     
  }
}
