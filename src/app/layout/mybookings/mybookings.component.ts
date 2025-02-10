import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../shared/services/dbservice.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mybookings',
  imports: [CommonModule],
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent implements OnInit {

  userBookings: any[] = [];
  

  constructor(private dbService: DbserviceService){}

  ngOnInit(): void {
    this.fetchbookings()
  }

  fetchbookings(){
    const userID = localStorage.getItem('token');
    this.dbService.getRecord('bookings').subscribe((response:any)=>{
      this.userBookings = response.filter((booking: any)=> booking.userID == userID)
    })
  }
}
