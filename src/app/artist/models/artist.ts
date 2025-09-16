import {Event} from '../../event/models/event';

export interface Artist {
 id: number;
 label: string;
 events: Event[];
}
