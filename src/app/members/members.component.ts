import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from "../member"
import { HttpService } from '../http.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  //@ViewChild(HttpService) myService;
  
  watchlistsLoaded(result: any): void  {
    console.log('Watchlists loaded: ' + result.items);
    //debugger;
  }

  ngOnInit(): void {
    console.log('Members component - onInit');
    var watchlists = this.httpService.getWatchLists(this.watchlistsLoaded);    
  }


  hero1 = {
    id: 1,
    name: "Eugene"
  }

  

}
