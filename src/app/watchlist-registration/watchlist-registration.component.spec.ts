import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistRegistrationComponent } from './watchlist-registration.component';

describe('WatchlistRegistrationComponent', () => {
  let component: WatchlistRegistrationComponent;
  let fixture: ComponentFixture<WatchlistRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
