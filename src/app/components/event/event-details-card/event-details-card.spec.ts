import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsCard } from './event-details-card';

describe('EventDetailsCard', () => {
  let component: EventDetailsCard;
  let fixture: ComponentFixture<EventDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
