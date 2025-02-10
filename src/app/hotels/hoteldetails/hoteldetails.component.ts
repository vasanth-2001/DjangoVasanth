import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-hoteldetails',
  imports: [CommonModule , RouterModule],
  templateUrl: './hoteldetails.component.html',
  styleUrl: './hoteldetails.component.css'
})
export class HoteldetailsComponent {
  room: any;

  constructor(private route: ActivatedRoute , private router: Router){}

  ngOnInit(): void{
    this.room = history.state.data;
  }
  // goBack(): void {
  //   this.router.navigate(['/delhi'])
  // }

  onbookNow(): void{
    this.router.navigate(['/book'], { state: { room: this.room}});
  }
}
