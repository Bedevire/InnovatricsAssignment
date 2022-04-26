import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchListMember } from "../dal/watchlistmember"
import { WatchList } from '../dal/watchlist';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  selectedWatchList: string = "";
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = {} as File;
  

  watchLists: WatchList[] = [];
  watchList: WatchList = {
    id: "",
    displayName: "",
    fullName: "",
    threshold: "",
    previewColor: ""
  };

  watchListMembers: WatchListMember[] = [];
  watchListMember: WatchListMember = {
    id: "",
    displayName: "",
    fullName: "",
    note: ""
  }

  constructor(
    private httpService: HttpService) { }

  //@ViewChild(HttpService) myService;

  ngOnInit(): void {        
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

  watchListCreated(result: any): void{
    //console.log('WatchList created');
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

  onWatchListClick(watchList: WatchList): void{    
    this.httpService.createWatchList(watchList, this.watchListCreated);
  }

  onWatchListMemberClick(watchListMember: WatchListMember): void{
    this.httpService.createWatchListMember(watchListMember);
  }

  onWatchListMemberReisterClick(selectedWatchList: string): void{
    this.httpService.registerMemberToWatchList(selectedWatchList, this.file);
  }

  onWatchListChange(){
    console.log('WatchList selected: ' + this.selectedWatchList);
  }
}
