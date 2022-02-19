import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url: string = '';

  onVideoSubmit(event: string) {
    this.url = event;
    alert(event);
  }
}
