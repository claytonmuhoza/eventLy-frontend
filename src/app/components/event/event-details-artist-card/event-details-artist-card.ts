import {Component, computed, input} from '@angular/core';
import {Artist} from "../../../models/artist"
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-event-details-artist-card',
  imports: [
    MatIcon,
    MatIconButton,
    MatCard,
    MatCardContent,
    MatTooltip
  ],
  templateUrl: './event-details-artist-card.html',
  styleUrl: './event-details-artist-card.css'
})
export class EventDetailsArtistCard {
  artist = input.required<Artist>();
  firstLetter = computed(() => this.artist().label[0]?.toUpperCase() || "A");

  // Palette de couleurs pour les avatars
  private readonly avatarColors = [
    '#1976d2', // Blue
    '#388e3c', // Green
    '#f57c00', // Orange
    '#7b1fa2', // Purple
    '#c2185b', // Pink
    '#0097a7', // Cyan
    '#5d4037', // Brown
    '#455a64', // Blue Grey
  ];

  // Génère une couleur basée sur le nom de l'artiste
  getAvatarColor(): string {
    const name = this.artist().label;
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charCodeSum % this.avatarColors.length;
    return this.avatarColors[colorIndex];
  }
}