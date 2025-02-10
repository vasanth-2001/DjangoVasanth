import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../../../shared/services/dbservice.service'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-room-add',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [DbserviceService],
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css'
})
export class RoomAddComponent {
  newRoom: any = {
    title: '',
    price: '',
    type: 'inn',
    availability: 'available',
    imageUrl: '',
    description: '',
    city: 'ahemdabad'
  };

  constructor(
    private router: Router,
    private dbService: DbserviceService
  ) {}

  saveRoom() {
    this.dbService.addRecord('rooms', this.newRoom).subscribe(
      () => this.router.navigate(['/admin/rooms']),
      (error) => console.error('Error adding room:', error)
    );
  }

  cancelAdd() {
    this.router.navigate(['/admin/rooms']); // ✅ Corrected navigation method
  }
}
