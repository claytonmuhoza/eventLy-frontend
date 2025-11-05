import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {Artist, ArtistWritingDto, ArtistResponseDto} from '../models/artist';
import {Pageable} from '../models/pageable';

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
    pageable.sort.forEach(sortField => params.append('sort', sortField));
    return this.httpClient.get<Page<Artist>>(`${this.baseUrl}`, {params: params});
  }
  public create(artist:ArtistWritingDto):Observable<ArtistResponseDto>{
    return this.httpClient.post<ArtistResponseDto>(`${this.baseUrl}`, artist);
  }
  public detailsArtist():Observable<Artist>{
    return this.httpClient.get<Artist>(`${this.baseUrl}`);
  }
}
