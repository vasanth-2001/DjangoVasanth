import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from '../../shared/services/dbservice.service';
import { title } from 'process';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  room:any;
  checkIn: string ="";
  checkOut: string ="";
  guests: number = 1;

  constructor(private router: Router, private dbService: DbserviceService){}

  ngOnInit(): void {
    
    this.room = history.state.room;


  }
  onbookRoom():void{
    const bookingData = {
      roomId: this.room.id,
      userID: localStorage.getItem('token') ,
      title: this.room.title,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      guests: this.guests,
      totalAmount: this.calculateTotalAmount()
    };
    
    this.dbService.addRecord('bookings',bookingData).subscribe((response)=>{
      console.log('Booking successful:',response);
      this.router.navigate(['/'], { state: {data: bookingData}})
    },)
    
  }
  
  calculateTotalAmount(): number {
      const checkInDate = new Date(this.checkIn);
      const checkOutDate = new Date(this.checkOut);
      const nightDifference = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
      return this.room.price * nightDifference * this.guests;
  }

}
