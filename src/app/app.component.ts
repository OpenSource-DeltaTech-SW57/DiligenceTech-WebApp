import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diligencetech-webapp';
  options = [
    { path: '/home', title: 'Home testing'},
    { path: '/testing/users', title: 'Users testing'},
    {path:'/about', title: 'About testing'}
  ]
}
