import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  // isOver = false;
  constructor() { }
  
  startCountingTime() {
    let minutesToWaits = 3;
    return new Promise((resolve)=>{
      setTimeout(
        () =>  true , minutesToWaits*60000)
    })
    
  }

  

}
