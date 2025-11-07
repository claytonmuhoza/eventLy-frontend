import { Routes } from '@angular/router';
import {ArtistList} from './components/artist/artist-list/artist-list';
import {ArtistDetails} from './components/artist/artist-details/artist-details';
import {ArtistForm} from './components/artist/artist-form/artist-form';
import {EventList} from './components/event/event-list/event-list';
import {EventDetails} from './components/event/event-details/event-details';
import {EventForm} from './components/event/event-form/event-form';
import {HomePage} from './pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'artists',
    component: ArtistList
  },
  {
    path: 'artists/new',
    component: ArtistForm
  },
  {
    path: 'artists/:id',
    component: ArtistDetails
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
