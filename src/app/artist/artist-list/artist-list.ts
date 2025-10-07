import {Component, inject, signal} from '@angular/core';
import {ArtistService} from '../services/artist-service';
import {Page} from '../../shared/models/page';
import {Artist} from '../models/artist';
import {ArtistCard} from '../artist-card/artist-card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-artist-list',
  imports: [
    ArtistCard,
    MatPaginator
  ],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css'
})
export class ArtistList {
  private artistService = inject(ArtistService);
  artists = signal<Page<Artist> | null>(null);
  pageSize = signal(10);
  page = signal(0);
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.artistService.listArtists({
      page:this.page(),
      sort: [],
      size:this.pageSize(),
    }).subscribe(
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
  onPage(e: PageEvent) {
    this.page.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
    this.fetchData()
  }
}
