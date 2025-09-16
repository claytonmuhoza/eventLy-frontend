import {Component, input} from '@angular/core';
import {Artist} from '../models/artist';

@Component({
  selector: 'app-artist-card',
  imports: [],
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.css'
})
export class ArtistCard {
  artist = input.required<Artist>()

  ngOnInit () {
    console.log(this.artist(), 'artist');
  }
}
