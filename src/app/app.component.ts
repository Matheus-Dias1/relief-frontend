import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url: string = 'https://www.youtube.com/watch?v=Rt2mdokoHR8';

  onVideoSubmit(event: string) {
    this.url = event;
  }
}
