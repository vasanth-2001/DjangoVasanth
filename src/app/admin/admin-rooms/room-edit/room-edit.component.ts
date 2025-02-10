
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../../../shared/services/dbservice.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [DbserviceService],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent {
  roomId:any;
  roomData: any = {
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DbserviceService
  ) {}

  ngOnInit() {
    this.roomId = (this.route.snapshot.paramMap.get('id'));
    if (this.roomId) {
      this.fetchRoomData(this.roomId);
    }
  }

  fetchRoomData(id: number) {
    this.dbService.getSingleRecord('rooms', id).subscribe(
      (data) => {
        this.roomData = data;
      },
      (error) => console.error('Error fetching room data:', error)
    );
  }

  saveRoom() {
    if (this.roomId) {
      this.dbService.updateRecord('rooms', this.roomId, this.roomData).subscribe(
        () => this.router.navigate(['/admin/rooms']),
        (error) => console.error('Error updating room:', error)
      );
    }
  }

  cancelEdit() {
    this.router.navigate(['/admin/rooms']); // ✅ Navigate back to AdminRoomsComponent
  }
}
