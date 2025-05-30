import { Component } from '@angular/core';
import { Dash1Component } from '../dash-1/dash-1.component';
import { Dash2Component } from '../dash-2/dash-2.component';
import { Dash3Component } from '../dash-3/dash-3.component';
import { Dash4Component } from '../dash-4/dash-4.component';

@Component({
  selector: 'app-dashboard',
  imports: [Dash1Component,Dash2Component,Dash3Component,Dash4Component],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
