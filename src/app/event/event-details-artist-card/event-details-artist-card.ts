import {Component, input} from '@angular/core';
import {Artist} from '../../artist/models/artist';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-event-details-artist-card',
  imports: [
    MatIcon,
    MatFabButton
  ],
  templateUrl: './event-details-artist-card.html',
  styleUrl: './event-details-artist-card.css'
})
export class EventDetailsArtistCard {
  artist = input.required<Artist>();
}
