import {Component, input} from '@angular/core';
import {EventDetailsArtistCard} from '../event-details-artist-card/event-details-artist-card';
import {MatIcon} from '@angular/material/icon';
import {Artist} from '../../../models/artist';

@Component({
  selector: 'app-event-details-artist-list',
  imports: [
    EventDetailsArtistCard,
    MatIcon
  ],
  templateUrl: './event-details-artist-list.html',
  styleUrl: './event-details-artist-list.css'
})
export class EventDetailsArtistList {
  artists = input.required<Artist[]>();
}