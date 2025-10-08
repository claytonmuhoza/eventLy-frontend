import {Component, computed, effect, EventEmitter, inject, signal} from '@angular/core';
import {ArtistService} from '../services/artist-service';
import {Page} from '../../shared/models/page';
import {Artist} from '../models/artist';
import {ArtistCard} from '../artist-card/artist-card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ArtistListSearch} from '../artist-list-search/artist-list-search';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-artist-list',
  imports: [
    ArtistCard,
    MatPaginator,
    ArtistListSearch,
    MatButton,
    RouterLink
  ],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css'
})
export class ArtistList {
  private artistService = inject(ArtistService);
  artists = signal<Page<Artist> | null>(null);
  pageSize = signal(10);
  page = signal(0);
  name = signal<string>("");
  onNameChange = computed(()=>{
    this.fetchData(this.name());
    return this.name();
  })
  ngOnInit() {
    this.fetchData();
    toObservable(this.name).subscribe(
      name => {
        this.fetchData(name)
      }
    )
  }
  fetchData(label?:string) {
    this.artistService.listArtists({
      page:this.page(),
      sort: [],
      size:this.pageSize(),
    }, label).subscribe(
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
