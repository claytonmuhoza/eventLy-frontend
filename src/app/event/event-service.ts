import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {EventSchema} from './models/event-schema';
import {Page} from '../shared/models/page';
import {Pageable} from '../shared/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private  httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/events`;
  public listEvents(pageable: Pageable): Observable<Page<EventSchema>>{
    let params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size);
    pageable.sort.forEach(sortField => {
      params = params.append('sort', sortField);
    });
    return this.httpClient.get<Page<EventSchema>>(this.baseUrl, {params: params});
  }
}
