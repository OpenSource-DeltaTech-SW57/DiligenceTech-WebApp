import { Component } from '@angular/core';

@Component({
  selector: 'app-dp-start-date',
  templateUrl: './dp-start-date.component.html',
  styleUrl: './dp-start-date.component.scss'
})
export class DpStartDateComponent {
  startDate = new Date(1990,0,1);

}
