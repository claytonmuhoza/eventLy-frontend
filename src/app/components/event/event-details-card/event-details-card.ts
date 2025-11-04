import { Component, input } from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {EventSchema} from '../../../models/event-schema';

@Component({
  selector: 'app-event-details-card',
  imports: [
    DatePipe,
    MatChip,
    MatChipSet,
  ],
  templateUrl: './event-details-card.html',
  styleUrl: './event-details-card.css'
})
export class EventDetailsCard {
    eventDetails = input.required<EventSchema>();
}
