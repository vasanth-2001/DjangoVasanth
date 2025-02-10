import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-main-dashboard',
  imports: [ FormsModule, RouterModule, CommonModule],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {
    searchResults: any[] = []

    rooms = [
      { name: 'Deluxe Room', location: 'Chennai', price:'1200', maxAdults: 2 , maxChildren: 1 },
      { name: 'Deluxe Room', location: 'Chennai', price:'1500', maxAdults: 4 , maxChildren: 1 },
      { name: 'Luxury Room', location: 'Delhi', price:'1600', maxAdults: 4 , maxChildren: 2 },
      { name: 'Standard Room', location: 'Mumbai', price:'800', maxAdults: 6 , maxChildren: 3 },
    ];

    searchParams = {
      place:'',
      checkIn:'',
      checkOut:'',
      adults:1,
      children:0
    };

    searchRooms(){
      if(!this.searchParams.place || !this.searchParams.checkIn || !this.searchParams.checkOut ){
        alert('Please fill all the fields !');
        return;
      }
      this.searchResults = this.rooms.filter(room => 
      (this.searchParams.place === '' || room.location.toLowerCase().includes(this.searchParams.place.toLowerCase())) &&
      (this.searchParams.adults <= room.maxAdults)&&
      (this.searchParams.children <= room.maxChildren)
      );
    }
}
