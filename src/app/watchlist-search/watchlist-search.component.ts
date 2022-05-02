import { Component, OnInit } from '@angular/core';
import { WatchListMember } from "../dal/watchlistmember"
import { WatchList } from '../dal/watchlist';
import { MatchResult } from '../dal/matchresult';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-watchlist-search',
  templateUrl: './watchlist-search.component.html',
  styleUrls: ['./watchlist-search.component.css']
})
export class WatchlistSearchComponent implements OnInit {

  selectedWatchListId: string = "";
  threshold: number = 40;
  minFaceSize: number = 35;
  maxFaceSize = 600;

  file: File = {} as File;
  file12: File = {} as File;
  watchListId: string = "";

  watchLists: WatchList[] = [];
  matchResults: MatchResult[] = [];

  loading:boolean = false;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getWatchLists();
  }

  onFileUploadChange(event: any){
    this.file = event.target.files[0];
  }

  onUpload(){
    console.log('Uploading file: ' + this.file)
  }
  
  
  getWatchLists(){
    this.httpService.getWatchLists().subscribe((result:any) => {      
      var self = this;
      result.items.forEach(function(element: any) {
        self.watchLists.push({
          id: element.id,
          displayName: element.displayName,
          fullName: element.fullName,
          threshold: element.threshold,
          previewColor: element.previewColor,
        });
      });
    });
  }

  search(){
    var self = this;

    this.loading = true;
    this.matchResults = [];

    var imageData: string = "";
    const reader = new FileReader();

    reader.addEventListener('load', function(){
      if(reader.result != null){
        imageData = reader.result as string;
        imageData = imageData.substring(imageData.indexOf('base64') + 7)

        var json: any = {
          
            "image": {
              "data": imageData
            },
            "watchlistIds": [
              self.selectedWatchListId
            ],
            "threshold": self.threshold,
            "maxResultCount": 1,
            "faceDetectorConfig": {
              "minFaceSize": self.minFaceSize,
              "maxFaceSize": self.maxFaceSize,
              "maxFaces": 20,
              "confidenceThreshold": 450
            },
            "faceDetectorResourceId": "cpu",
            "templateGeneratorResourceId": "cpu",
            "faceMaskConfidenceRequest": {
              "faceMaskThreshold": 3000
            },
            "faceFeaturesConfig": {
              "age": true,
              "gender": true,
              "faceMask": true,
              "noseTip": true,
              "yawAngle": true,
              "pitchAngle": true,
              "rollAngle": true
            }      
        };
        
        self.httpService.searchWatchList(json).subscribe((result: any) => {
          
          result.forEach(function(element: any){
            element.matchResults.forEach(function(matchElement: any){
              self.matchResults.push({
                score: matchElement.score,
                displayName: matchElement.displayName,
                fullName: matchElement.fullName,
                watchlistDisplayName: matchElement.watchlistDisplayName,
                watchlistFullName: matchElement.watchlistFullName,
                watchlistId: matchElement.watchlistId,
                watchlistMemberId: matchElement.watchlistMemberId,

                age: element.age,
                gender: element.gender,
                rightEyeX: element.rightEyeX,
                rightEyeY: element.rightEyeY,
                leftEyeX: element.leftEyeX,
                leftEyeY: element.leftEyeY
              });
            });
          });
        });
        self.loading = false;
      }
      else{
      }
      
    }, false);
  
    if(this.file){
      reader.readAsDataURL(this.file);
    }

  }

  formValid(): boolean{
    var isValid = true;

    if(this.selectedWatchListId == '0' || this.selectedWatchListId == '' || this.isEmpty(this.file.name)){
      isValid = false;
    }

    return isValid;
  }

  isEmpty(val: any):boolean{
    return(val === undefined || val == null || val == '');
  }

}
