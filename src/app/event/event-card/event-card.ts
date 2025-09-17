import {Component, input} from '@angular/core';
import  {EventSchema} from '../models/event-schema'
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-event-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatIcon
  ],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  event = input.required<EventSchema>()
}
