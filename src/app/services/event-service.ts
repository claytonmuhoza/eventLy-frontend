import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {EventSchema} from '../models/event-schema';
import {Page} from '../models/page';
import {Pageable} from '../models/pageable';
import {EventWritingDto} from '../models/event-writing-dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private  httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/events`;
  public listEvents(pageable: Pageable, label=""): Observable<Page<EventSchema>>{
    let params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size);
    if (label){
      params.append('label', label);
    }
    pageable.sort.forEach(sortField => params.append('sort', sortField));
    return this.httpClient.get<Page<EventSchema>>(this.baseUrl, {params: params});
  }
  public createEvents(event:EventWritingDto): Observable<EventSchema>{
    return this.httpClient.post<EventSchema>(`${this.baseUrl}`, event);
  }
  public detailsEvents(id: string): Observable<EventSchema>{
    return this.httpClient.get<EventSchema>(`${this.baseUrl}/${id}`);
  }
  public associateArtisToAnEvent(eventId: string, artistId: string){
    return this.httpClient.post<string>(`${this.baseUrl}/${eventId}/artists/${artistId}`, artistId);
  }

}
