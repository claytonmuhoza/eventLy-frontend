import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsArtistList } from './event-details-artist-list';

describe('EventDetailsArtistList', () => {
  let component: EventDetailsArtistList;
  let fixture: ComponentFixture<EventDetailsArtistList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsArtistList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsArtistList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
