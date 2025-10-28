import {Component, input} from '@angular/core';
import  {EventSchema} from '../models/event-schema'
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-event-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatIcon,
    RouterLink,
    MatChipSet,
    MatChip,
    DatePipe
  ],
  templateUrl: './event-list-card.html',
  styleUrl: './event-list-card.css'
})
export class EventListCard {
  event = input.required<EventSchema>()
}
