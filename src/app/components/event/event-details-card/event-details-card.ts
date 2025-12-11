import { Component, input } from '@angular/core';
import { DatePipe, registerLocaleData } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { EventSchema } from '../../../models/event-schema';
import { MatCard, MatCardContent } from '@angular/material/card';
import localeFr from '@angular/common/locales/fr';

// Enregistrer la locale française
registerLocaleData(localeFr);

@Component({
  selector: 'app-event-details-card',
  imports: [
    DatePipe,
    MatIcon,
    MatCard,
    MatCardContent
  ],
  templateUrl: './event-details-card.html',
  styleUrl: './event-details-card.css'
})
export class EventDetailsCard {
  eventDetails = input.required<EventSchema>();

  // Calcule la durée de l'événement en jours
  getDuration(): number {
    const event = this.eventDetails();
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
  }
}