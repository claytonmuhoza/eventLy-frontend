import {Artist} from './artist';

export interface EventSchema {
  id: string;
  label: string;
  startDate: Date;
  endDate: Date;
  artists: Artist[];
}
