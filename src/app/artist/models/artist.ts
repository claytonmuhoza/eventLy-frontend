import {EventSchema} from '../../event/models/event-schema';

export interface Artist {
 id: string;
 label: string;
 events: EventSchema[];
}
