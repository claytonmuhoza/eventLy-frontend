import {Component, computed, effect, inject, signal} from '@angular/core';
import {EventService} from '../../../services/event-service';
import {EventSchema} from '../../../models/event-schema';
import {Page} from '../../../models/page';
import {EventListCard} from '../event-card/event-list-card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {HttpErrorResponse} from '@angular/common/http';

import {MatDialog} from '@angular/material/dialog';
import {EventForm} from '../event-form/event-form';
import {HttpError} from '../../http-error/http-error';

@Component({
  selector: 'app-event-list',
  imports: [
    EventListCard,
    MatCard,
    MatButton,
    MatProgressSpinner,
    MatPaginator,
    HttpError,
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList {
  private eventServices = inject(EventService);
  events = signal<Page<EventSchema> | null>(null);
  loading = signal(true);
  error = signal<HttpErrorResponse | undefined>(undefined);
  pageSize = signal(10);
  page = signal(0);
  readonly dialog = inject(MatDialog);
  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(EventForm, {
      width: '32rem',
    });

    dialogRef.afterClosed().subscribe();
  }
  ngOnInit() {
    this.fetchData()

  }
  fetchData(){
    this.eventServices.listEvents({
      page:this.page(),
      size:this.pageSize(),
      sort:[]
    }).subscribe({
      next: (event: Page<EventSchema>) => {
        this.loading.set(false);
        this.events.set(event);
      },
      error: (error : HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(error);
        console.error(error);
      }
    })
  }
  onPage(e: PageEvent) {
    this.page.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
    this.fetchData()
  }

  protected readonly open = open;
}
