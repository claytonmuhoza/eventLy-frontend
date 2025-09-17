import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {EventSchema} from './models/event-schema';
import {Page} from '../shared/models/page';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private  httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/events`;
  public listEvents(): Observable<Page<EventSchema>>{
    return this.httpClient.get<Page<EventSchema>>(this.baseUrl);
  }
}
