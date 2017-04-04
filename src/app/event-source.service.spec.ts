import { TestBed, inject } from '@angular/core/testing';

import { EventSourceService } from './event-source.service';

describe('EventSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventSourceService]
    });
  });

  it('should ...', inject([EventSourceService], (service: EventSourceService) => {
    expect(service).toBeTruthy();
  }));
});
