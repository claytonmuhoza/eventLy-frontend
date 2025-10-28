import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsAssociateArtist } from './event-details-associate-artist';

describe('EventDetailsAssociateArtist', () => {
  let component: EventDetailsAssociateArtist;
  let fixture: ComponentFixture<EventDetailsAssociateArtist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsAssociateArtist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsAssociateArtist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
