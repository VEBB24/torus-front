import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var EventSource: any

@Injectable()
export class EventSourceService {
  evtSource
  constructor(public auth: AuthService) { 
    
  }

  getEventSource() {
    /*this.evtSource = new EventSource(`/api/streaming/1`)
    this.evtSource.onmessage = function (e) {
      console.log(e)
    }*/

    this.evtSource = new EventSource('/api/streaming/1')
    this.evtSource.onmessage = (e) => console.log(e.data)
  }

}
