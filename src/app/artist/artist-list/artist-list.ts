import {Component, inject, signal} from '@angular/core';
import {ArtistService} from '../services/artist-service';
import {Page} from '../../shared/models/page';
import {Artist} from '../models/artist';
import {ArtistCard} from '../artist-card/artist-card';

@Component({
  selector: 'app-artist-list',
  imports: [
    ArtistCard
  ],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css'
})
export class ArtistList {
  private artistService = inject(ArtistService);
  artists = signal<Page<Artist> | null>(null);
  ngOnInit() {
    this.artistService.listArtists().subscribe(
      {
        next: data => {
          this.artists.set(data);
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }
}
