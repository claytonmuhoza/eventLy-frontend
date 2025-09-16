import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/page';
import {Artist} from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/artists`;
  public listArtists():Observable<Page<Artist>>{
    return this.httpClient.get<Page<Artist>>(`${this.baseUrl}`);
  }
  public detailsArtist():Observable<Artist>{
    return this.httpClient.get<Artist>(`${this.baseUrl}`);
  }
}
