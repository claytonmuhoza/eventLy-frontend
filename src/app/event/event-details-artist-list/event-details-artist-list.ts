import {Component, computed, input} from '@angular/core';
import {EventSchema} from '../models/event-schema';
import {EventDetailsArtistCard} from '../event-details-artist-card/event-details-artist-card';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-event-details-artist-list',
  imports: [
    EventDetailsArtistCard,
    MatCard
  ],
  templateUrl: './event-details-artist-list.html',
  styleUrl: './event-details-artist-list.css'
})
export class EventDetailsArtistList {
  eventDetails = input.required<EventSchema>()
  artists = computed(()=>this.eventDetails().artists);
}
