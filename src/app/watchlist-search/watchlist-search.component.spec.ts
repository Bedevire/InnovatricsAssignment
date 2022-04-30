import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistSearchComponent } from './watchlist-search.component';

describe('WatchlistSearchComponent', () => {
  let component: WatchlistSearchComponent;
  let fixture: ComponentFixture<WatchlistSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
