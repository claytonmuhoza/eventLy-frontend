import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './core/layout/header/header';
import {EventList} from './event/event-list/event-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, EventList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-event');
}
