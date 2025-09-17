import { Routes } from '@angular/router';
import {ArtistList} from './artist/artist-list/artist-list';
import {ArtistDetails} from './artist/artist-details/artist-details';
import {ArtistForm} from './artist/artist-form/artist-form';
import {EventList} from './event/event-list/event-list';
import {EventDetails} from './event/event-details/event-details';
import {EventForm} from './event/event-form/event-form';

export const routes: Routes = [
  {
    path: 'artists',
    component: ArtistList
  },
  {
    path: 'artists/:id',
    component: ArtistDetails
  },
  {
    path: 'artists/new',
    component: ArtistForm
  },
  {
    path: 'events',
    component: EventList
  },
  {
    path: 'events/new',
    component: EventForm
  },
  {
    path: 'events/:id',
    component: EventDetails
  }
];
