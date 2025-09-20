import {Component, inject, signal} from '@angular/core';
import {EventService} from '../event-service';
import {EventSchema} from '../models/event-schema';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {EventDetailsCard} from '../event-details-card/event-details-card';
import {EventDetailsArtistList} from '../event-details-artist-list/event-details-artist-list';
import {EventDetailsAssociateArtist} from '../event-details-associate-artist/event-details-associate-artist';

@Component({
  selector: 'app-event-details',
  imports: [
    EventDetailsCard,
    EventDetailsArtistList,
    EventDetailsAssociateArtist
  ],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetails {
    eventApi = inject(EventService);
    router = inject(ActivatedRoute);
    eventId  = this.router.snapshot.params['id'];
    eventDetails  = signal<EventSchema | undefined>(undefined);
    ngOnInit() {
        this.fetchDetailsEvent(this.eventId);
    }
    fetchDetailsEvent(eventId:string){
      this.eventApi.detailsEvents(eventId).subscribe(
        {
          next: eventDetails => {
            this.eventDetails.set(eventDetails)
          },
          error: (error : HttpErrorResponse)  => {
            console.log(error)
          }
        }
      )
    }
}
