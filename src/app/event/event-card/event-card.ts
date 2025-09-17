import {Component, input} from '@angular/core';
import  {EventSchema} from '../models/event-schema'
@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  event = input.required<EventSchema>()
}
