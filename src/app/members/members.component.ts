import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchListMember } from "../dal/watchlistmember"
import { WatchList } from '../dal/watchlist';
import { MatchResult } from '../dal/matchresult';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  selectedWatchList1: string = "";
  selectedWatchList2: string = "";
  selectedWatchList3: string = "";
  selectedMember: string = "";
  threshold: number = 0;

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = {} as File;
  file12: File = {} as File;
  watchListId: string = "";
  watchListId2: string = "";
  

  watchLists: WatchList[] = [];
  watchListMembers: WatchListMember[] = [];
  matchResults: MatchResult[] = [];

  watchList: WatchList = {
    id: "",
    displayName: "",
    fullName: "",
    threshold: "",
    previewColor: ""
  };

  watchListMember: WatchListMember = {
    id: "",
    displayName: "",
    fullName: "",
    note: ""
  };

  constructor(private httpService: HttpService) { }

  //@ViewChild(HttpService) myService;

  ngOnInit(): void {        
    this.getWatchLists();
    this.getWatchListMembers();
  }

  onFileUploadChange(event: any){
    this.file = event.target.files[0];
  }

  onUpload(){
    //debugger;
    console.log('Uploading file: ' + this.file)
    /*this.fileUploadService.upload(this.file).subscribe((event:any) => {
      if(typeof(event) === 'object'){
        this.shortLink = event.link;
        this.loading = false;
      }
    });*/
  }

  
  // Watch Lists

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

  createWatchList(watchList: WatchList): void{    
    this.httpService.createWatchList(watchList).subscribe((result: any) => {
      window.location.reload();
    });
  }

  deleteWatchList(id:string){    
    this.httpService.deleteWatchList(id).subscribe((result: any) => {
      window.location.reload();
    });
  }


  // WatchList members

  getWatchListMembers(){
    this.httpService.getWatchListMembers().subscribe((results: any) =>{
      var self = this;
      results.items.forEach(function(element: any){
        self.watchListMembers.push({
          id: element.id,
          displayName: element.displayName,
          fullName: element.fullName,
          note: element.note
        });
      });
    });
  }

  deleteWatchListMember(id:string){
    console.log('Delete watchlist member');
    this.httpService.deleteWatchListMember(id).subscribe((result: any) => {
      window.location.reload();
    });
  }

  createWatchListMember(watchListMember: WatchListMember): void{
    this.httpService.createWatchListMember(watchListMember);
  }

  registerMemberToWatchList(): void{
    this.httpService.registerMemberToWatchList(this.selectedMember, this.selectedWatchList1, this.file);
  }

  onWatchListChange(){
    console.log('WatchList selected: ' + this.selectedWatchList2);
  }

  onWatchListMemberChange(){
    console.log('WatchList Member selected: ' + this.selectedMember);
  }


  // WatchList search
  search(){
    var self = this;

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
              self.selectedWatchList3
            ],
            "threshold": 40,
            "maxResultCount": 1,
            "faceDetectorConfig": {
              "minFaceSize": 35,
              "maxFaceSize": 600,
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

      }
      else{
      }
      
    }, false);
  
    if(this.file){
      reader.readAsDataURL(this.file);
    }

  }
}
