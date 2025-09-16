import {Event} from '../../event/models/event';

export interface Artist {
 id: number;
 name: string;
 events: Event[];
}
