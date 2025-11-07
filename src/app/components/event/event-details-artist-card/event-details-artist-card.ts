import {Component, computed, input} from '@angular/core';
import {Artist} from "../../../models/artist"
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardActions, MatCardHeader} from '@angular/material/card';

@Component({
  selector: 'app-event-details-artist-card',
  imports: [
    MatIcon,
    MatFabButton,
    MatCard,
    MatCardHeader,
    MatCardActions
  ],
  templateUrl: './event-details-artist-card.html',
  styleUrl: './event-details-artist-card.css'
})
export class EventDetailsArtistCard {
  artist = input.required<Artist>();
  firstLetter = computed(()=> this.artist().label[0].toUpperCase() || "A")
}
