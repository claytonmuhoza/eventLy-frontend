import {EventSchema} from '../../event/models/event-schema';

export interface Artist {
 id: string;
 label: string;
 events: EventSchema[];
}
export interface ArtistWritingDto {
  label: string;
}
export interface ArtistResponseDto{
  id: number;
  label: string;
}
