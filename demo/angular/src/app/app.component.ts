import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>Angular</h1>
    <nav>
      <a (click)="setTitle( 'Home' )" routerLink="/" routerLinkActive="active">Home</a>
      <a (click)="setTitle( 'About' )" routerLink="/about" routerLinkActive="active">About</a>
    </nav>
    <hr />

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Home';
  public constructor(private titleService: Title ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
