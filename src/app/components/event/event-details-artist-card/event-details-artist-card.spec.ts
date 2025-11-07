import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsArtistCard } from './event-details-artist-card';

describe('EventDetailsArtistCard', () => {
  let component: EventDetailsArtistCard;
  let fixture: ComponentFixture<EventDetailsArtistCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsArtistCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsArtistCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
