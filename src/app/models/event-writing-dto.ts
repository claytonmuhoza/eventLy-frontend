export class EventWritingDto {
  label: string;
  startDate: string;
  endDate: string;
  constructor(label: string, startDate: Date, endDate: Date) {
    this.label = label;
    this.startDate = startDate.toISOString().split('T')[0];
    this.endDate = startDate.toISOString().split('T')[0];
    console.log(this.startDate,this.endDate);
  }


}
