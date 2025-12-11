import {Component, inject, signal} from '@angular/core';
import {EventService} from '../../../services/event-service';
import {EventSchema} from '../../../models/event-schema';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {EventDetailsArtistList} from '../event-details-artist-list/event-details-artist-list';
import {EventDetailsAssociateArtist} from '../event-details-associate-artist/event-details-associate-artist';
import {Artist} from '../../../models/artist'
import {HttpError} from '../../http-error/http-error';
import {MatDialog} from '@angular/material/dialog';
import {EventForm} from '../event-form/event-form';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EventDetailsCard } from '../event-details-card/event-details-card';

@Component({
  selector: 'app-event-details',
  imports: [
    EventDetailsArtistList,
    EventDetailsCard,
    EventDetailsAssociateArtist,
    MatIcon,
    MatButtonModule,
    HttpError
  ],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetails {
    eventApi = inject(EventService);
    router = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  eventId:string  = this.router.snapshot.params['id'];
    eventDetails  = signal<EventSchema | undefined>(undefined);
    error = signal<HttpErrorResponse | undefined>(undefined)
    ngOnInit() {
        this.fetchDetailsEvent(this.eventId);
    }
    fetchDetailsEvent(eventId:string){
      this.eventApi.detailsEvents(eventId).subscribe(
        {
          next: eventDetails => {
            this.eventDetails.set(eventDetails)
          },
          error: (httpErrorResponse : HttpErrorResponse)  => {
           this.error.set(httpErrorResponse);
          }
        }
      )
    }
  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(EventForm, {
      width: '32rem',
      data: {
        eventId: this.eventId,
        eventDetails: this.eventDetails(),
      }
    });

    dialogRef.afterClosed().subscribe(result =>
    {
      if(result){
        this.eventDetails.set(result);
      }
    }
    );
  }
  handleArtistAdded(artist: Artist): void {
    this.eventDetails.update(currentEvent => {
      if (currentEvent) {
        currentEvent.artists = [artist,...(currentEvent.artists || [])]
      }
      return currentEvent
    })
    console.log(this.eventDetails())
  }
}
