import { Component, OnInit } from '@angular/core';
import { WatchListMember } from "../dal/watchlistmember"
import { CommonModule } from '@angular/common';
import { WatchList } from '../dal/watchlist';
import { MatchResult } from '../dal/matchresult';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-watchlist-registration',
  templateUrl: './watchlist-registration.component.html',
  styleUrls: ['./watchlist-registration.component.css']
})

export class WatchlistRegistrationComponent implements OnInit {

  selectedWatchListId: string = "";
  selectedWatchListName: string = "";
  selectedMemberId: string = "";
  selectedMemberName: string = "";
  file: File = {} as File;
  watchLists: WatchList[] = [];
  watchListMembers: WatchListMember[] = [];

  watchListMember: WatchListMember = {
    id: "",
    displayName: "",
    fullName: "",
    note: ""
  };

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getWatchLists();
    this.getWatchListMembers();
    this.formValid();
  }

  onFileUploadChange(event: any){
    this.file = event.target.files[0];
  }

  onUpload(){
    console.log('Uploading file: ' + this.file);
  }
  
  formValid(): boolean{
    var valid:boolean = true;

    if((this.selectedWatchListId == '0' || this.selectedWatchListId == '') && this.selectedWatchListName == ''){
      valid = false;
    }

    if((this.selectedMemberId == '0' || this.selectedMemberId == '') && this.selectedMemberName == ''){
      valid = false;
    }

    if(this.isEmpty(this.file.name)){

      valid = false;
    }

    return valid;
  }

  isEmpty(val: any):boolean{
    return(val === undefined || val == null || val == '');
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

  deleteWatchListMember(id:string){
    console.log('Delete watchlist member');
    this.httpService.deleteWatchListMember(id).subscribe((result: any) => {
      window.location.reload();
    });
  }

  registerMemberToWatchList(){
    debugger;
    this.httpService.registerMemberToWatchList(this.selectedMemberId, this.selectedWatchListId, this.file);
    //this.selectedMemberId = '0';
    //this.selectedWatchListId = '0';
  }

  registerMemberToWatchListClick(){

    // If the watchlistId is 0, then we must create it first
    if(this.selectedWatchListId == '0'){
      debugger;
      var watchList: WatchList = {
        id: "",
        displayName: this.selectedWatchListName,
        fullName: this.selectedWatchListName,
        previewColor: "#aaaaaa",
        threshold: "20"
      };
      this.httpService.createWatchList(watchList).subscribe((result: any) => {
        this.selectedWatchListId = result.id;
        if(this.selectedMemberId != '0'){
          this.registerMemberToWatchList();
        }
      });
    }
    // If the watchlistMemberId is 0, then we must create it first
    if(this.selectedMemberId == '0'){      
      debugger;
      var watchListMember: WatchListMember = {
        id: "",
        displayName: this.selectedMemberName,
        fullName: this.selectedMemberName,
        note: ""
      }

      this.httpService.createWatchListMember(watchListMember).subscribe((result: any) => {
        this.selectedMemberId = result.id;
        if(this.selectedWatchListId != '0'){
          this.registerMemberToWatchList();
        }
      });
    }
  }

  onWatchListChange(){
    if(this.selectedWatchListId == '0'){
      console.log('New WatchList: ' + this.selectedWatchListName);
    }
    else{
      console.log('WatchList selected: ' + this.selectedWatchListId);
    }
  }

  onWatchListMemberChange(){
    if(this.selectedMemberId == '0'){
      console.log('New WatchList member: ' + this.selectedMemberName);
    }
    else{
      console.log('WatchList member selected: ' + this.selectedMemberId);
    }
  }  
}
