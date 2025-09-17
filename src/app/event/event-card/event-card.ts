import {Component, input} from '@angular/core';
import  {EventSchema} from '../models/event-schema'
import {MatCard, MatCardHeader} from '@angular/material/card';
@Component({
  selector: 'app-event-card',
  imports: [
    MatCard,
    MatCardHeader
  ],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  event = input.required<EventSchema>()
}
