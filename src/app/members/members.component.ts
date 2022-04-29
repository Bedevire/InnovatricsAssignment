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

  selectedWatchList1: string = "";
  selectedWatchList2: string = "";
  selectedMember: string = "";

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = {} as File;
  watchListId: string = "";
  

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
}
