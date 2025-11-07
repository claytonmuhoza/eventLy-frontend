import {Component, computed, effect, EventEmitter, inject, signal} from '@angular/core';
import {ArtistService} from '../../../services/artist-service';
import {Page} from '../../../models/page';
import {Artist} from '../../../models/artist';
import {ArtistCard} from '../artist-card/artist-card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ArtistListSearch} from '../artist-list-search/artist-list-search';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpError} from '../../http-error/http-error';
import {toObservable} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatCard} from '@angular/material/card';
import {ArtistForm} from '../artist-form/artist-form';
import {MatDialog} from '@angular/material/dialog';
import {EventForm} from '../../event/event-form/event-form';

@Component({
  selector: 'app-artist-list',
  imports: [
    ArtistCard,
    MatPaginator,
    ArtistListSearch,
    MatButton,
    HttpError,
    MatCard
  ],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css'
})
export class ArtistList {
  private artistService = inject(ArtistService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  artists = signal<Page<Artist> | null>(null);
  pageSize = signal(10);
  page = signal(0);
  name = signal<string>("");
  name$ = toObservable(this.name);
  error = signal<HttpErrorResponse|undefined>(undefined);
  readonly dialog = inject(MatDialog);
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.name.set(params.get('q') ||"")
    });
    this.name$.pipe(debounceTime(20),distinctUntilChanged()).subscribe(name => {
      this.onSearch(name);
    })

  }
  openCreateArtistDialog(): void {
    const dialogRef = this.dialog.open(ArtistForm, {
      width: '32rem',
    });

    dialogRef.afterClosed().subscribe();
  }
  fetchData(label?:string) {
    this.artistService.listArtists({
      page:this.page(),
      sort: [],
      size:this.pageSize(),
    }, label).subscribe(
      {
        next: data => {
          this.artists.set(data);
        },
        error: (error:HttpErrorResponse) => {
          this.error.set(error)
        }
      }
    );
  }
  onPage(e: PageEvent) {
    this.page.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
    this.fetchData(this.name())
  }
  onSearch(label: string) {
    this.name.set(label);
    this.page.set(0);
    const value = (this.name() ===""? null : this.name())
    this.updateQueryParams({ q: value  });
    this.fetchData(label);
  }
  private updateQueryParams(params: { [key: string]: string | null}) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    }).then(()=>{
    });
  }
}
