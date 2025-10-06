import {Component, input} from '@angular/core';
import {Artist} from '../models/artist';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-artist-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.css'
})
export class ArtistCard {
  artist = input.required<Artist>()

  ngOnInit () {
    console.log(this.artist(), 'artist');
  }
}
