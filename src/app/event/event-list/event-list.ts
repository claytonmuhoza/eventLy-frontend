import {Component, inject, signal} from '@angular/core';
import {EventService} from '../event-service';
import {EventSchema} from '../models/event-schema';
import {Page} from '../../shared/models/page';
import {EventCard} from '../event-card/event-card';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-event-list',
  imports: [
    EventCard,
    MatPaginator
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList {
  private eventServices = inject(EventService);
  events = signal<Page<EventSchema> | undefined>(undefined);
  loading = signal(true);
  error = signal<string | undefined>(undefined);
  ngOnInit() {
    this.eventServices.listEvents().subscribe({
      next: (event: Page<EventSchema>) => {
        this.loading.set(false);
        this.events.set(event);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(error);
        console.error(error);
      }
    })
  }
}
