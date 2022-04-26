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

  watchLists: WatchList[] = [];
  watchList: WatchList = {
    id: 0,
    displayName: "",
    fullName: "",
    threshold: "",
    previewColor: ""
  };

  constructor(private httpService: HttpService) { }

  //@ViewChild(HttpService) myService;


  watchListCreated(result: any): void{
    //console.log('WatchList created');
  }


  ngOnInit(): void {        
    this.httpService.getWatchLists().subscribe((result:any) => {
      console.log('watch list: ' + this.watchLists);
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

  onWatchListClick(watchList: WatchList): void{
    console.log('Submit Watchlst clicked');
    this.httpService.createWatchList(watchList, this.watchListCreated);
  }

}
