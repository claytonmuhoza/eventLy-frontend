import {EventSchema} from '../../event/models/event-schema';

export interface Artist {
 id: number;
 label: string;
 events: EventSchema[];
}
