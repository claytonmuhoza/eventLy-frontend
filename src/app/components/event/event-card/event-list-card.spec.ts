import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListCard } from './event-list-card';

describe('EventCard', () => {
  let component: EventListCard;
  let fixture: ComponentFixture<EventListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
