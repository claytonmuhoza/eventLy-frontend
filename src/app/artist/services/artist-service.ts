import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/page';
import {Artist} from '../models/artist';
import {Pageable} from '../../shared/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/artists`;
  public listArtists(pageable: Pageable, label=""):Observable<Page<Artist>>{
    let params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size)
      .set('label', label);
    pageable.sort.forEach(sortField => {
      params = params.append('sort', sortField);
    });
    return this.httpClient.get<Page<Artist>>(`${this.baseUrl}`, {params: params});
  }
  public detailsArtist():Observable<Artist>{
    return this.httpClient.get<Artist>(`${this.baseUrl}`);
  }
}
