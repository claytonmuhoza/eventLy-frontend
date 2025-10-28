import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListSearch } from './artist-list-search';

describe('ArtistListSearch', () => {
  let component: ArtistListSearch;
  let fixture: ComponentFixture<ArtistListSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistListSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistListSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
