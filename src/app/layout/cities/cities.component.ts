import { Component } from '@angular/core';
import { ChennaiComponent } from "../../cities/chennai/chennai.component";
import { AhemdabadComponent } from "../../cities/ahemdabad/ahemdabad.component";
import { DelhiComponent } from "../../cities/delhi/delhi.component";

@Component({
  selector: 'app-cities',
  imports: [ChennaiComponent, AhemdabadComponent, DelhiComponent],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {

}
