import {Artist} from '../../artist/models/artist';

export interface EventSchema {
  id: number;
  label: string;
  startDate: Date;
  endDate: Date;
  artists: Artist[] | null;
}
