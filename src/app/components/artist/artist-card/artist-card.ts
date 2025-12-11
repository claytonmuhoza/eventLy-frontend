import {Component, input} from '@angular/core';
import {Artist} from '../../../models/artist';
import {MatCard,  MatCardContent, } from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-artist-card',
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    RouterLink
  ],
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.css'
})
export class ArtistCard {
  artist = input.required<Artist>()
}
