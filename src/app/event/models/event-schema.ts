import {Artist} from '../../artist/models/artist';

export interface EventSchema {
  id: string;
  label: string;
  startDate: Date;
  endDate: Date;
  artists: Artist[] | null;
}
