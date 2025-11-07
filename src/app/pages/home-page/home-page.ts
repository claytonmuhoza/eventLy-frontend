import {Component, inject, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {ArtistService} from '../../services/artist-service';
import {Page} from '../../models/page';
import {Artist} from '../../models/artist';
import {HttpErrorResponse} from '@angular/common/http';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {finalize, fromEvent} from 'rxjs';
import {EventSchema} from '../../models/event-schema';
import {EventService} from '../../services/event-service';

@Component({
  selector: 'app-home-page',
  imports: [
    MatCard,
    MatProgressSpinner,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
    artisteApi = inject(ArtistService);
    eventApi= inject(EventService);
    artists = signal<Page<Artist> | null>(null)
    events = signal<Page<EventSchema> | null>(null)
    error = signal<HttpErrorResponse | null>(null)
    isLoading = signal(true);
    ngOnInit(): void {
      this.artisteApi.listArtists({
        page: 0, size:0, sort:[]
      })
        .pipe(finalize(() => {
          this.isLoading.set(false);
        }))
        .subscribe(
        {
          next: results => {
            this.artists.set(results);
          },
          error: (error: HttpErrorResponse) => {
            this.error.set(error);
          },
        }
      )
      this.eventApi.listEvents({page:0, size:5, sort:[]})
      .pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: results => {
          this.events.set(results);
        },
        error: (error: HttpErrorResponse) => {
          this.error.set(error);
        }
      })

    }
}
