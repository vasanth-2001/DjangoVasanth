
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-rooms',
//   standalone: true,
//   imports: [CommonModule, FormsModule], // Import FormsModule for ngModel
//   templateUrl: './admin-rooms.component.html',
//   styleUrl: './admin-rooms.component.css'
// })
// export class AdminRoomsComponent {
//   rooms = [
//     { id: 1, name: 'Deluxe Room', type: 'Deluxe', price: 120, available: true },
//     { id: 2, name: 'Suite Room', type: 'Suite', price: 200, available: false },
//     { id: 3, name: 'Standard Room', type: 'Standard', price: 80, available: true }
//   ];

//   newRoom = { id: 0, name: '', type: '', price: 0, available: true };
//   isEditing = false;
//   isAdding = false;

//   addRoom() {
//     this.isAdding = true;
//     this.isEditing = false;
//     this.newRoom = { id: 0, name: '', type: '', price: 0, available: true };
//   }

//   saveRoom() {
//     if (this.newRoom.id) {
//       const index = this.rooms.findIndex(room => room.id === this.newRoom.id);
//       if (index !== -1) {
//         this.rooms[index] = { ...this.newRoom };
//       }
//     } else {
//       this.newRoom.id = this.rooms.length + 1;
//       this.rooms.push({ ...this.newRoom });
//     }
//     this.isAdding = false;
//     this.isEditing = false;
//     this.newRoom = { id: 0, name: '', type: '', price: 0, available: true };
//   }

//   editRoom(room: any) {
//     this.isEditing = true;
//     this.isAdding = false;
//     this.newRoom = { ...room };
//   }

//   deleteRoom(id: number) {
//     this.rooms = this.rooms.filter(room => room.id !== id);
//   }

//   cancelEdit() {
//     this.isEditing = false;
//     this.isAdding = false;
//     this.newRoom = { id: 0, name: '', type: '', price: 0, available: true };
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DbserviceService } from '../../shared/services/dbservice.service'; 
// import { HttpClientModule } from '@angular/common/http';
// @Component({
//   selector: 'app-admin-rooms',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule ],
//   providers: [DbserviceService],
//   templateUrl: './admin-rooms.component.html',
//   styleUrl: './admin-rooms.component.css'
// })
// export class AdminRoomsComponent implements OnInit {
//   rooms: any 
//   newRoom: any = {}; // Use the same keys as in db.json
//   isEditing = false;
//   isAdding = false;

//   constructor(private dbService: DbserviceService) { }

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   fetchData() {
//     this.dbService.getRecord('rooms').subscribe((response: any) => {
//       console.log(response)
//       this.rooms = response;
//     });
//   }

//   addRoom() {
//     this.isAdding = true;
//     this.isEditing = false;
//     this.newRoom = { 
//       // id: '', // Or generate a unique ID here
//       title: '',
//       price: 0,  
//       type: '', 
//       availability: 'available', // Default to available
//       imageUrl: '', 
//       description: '', 
//       city: '' 
//     };
//   }

//   saveRoom() {
//     if (this.isEditing) {
//       // Update existing room
//       this.dbService.updateRecord('rooms', this.newRoom.id, this.newRoom)
//       .subscribe(() => this.fetchData()); 
//     } else {
//       // Add new room
//       this.dbService.addRecord('rooms', this.newRoom)
//       .subscribe(() => this.fetchData());
//     }
//     this.cancelEdit(); // Reset form and flags
//   }
//   // saveRoom() {
//   //   if (!this.newRoom.title || !this.newRoom.type) {
//   //     alert("Please fill in all fields.");
//   //     return;
//   //   }
  
//   //   if (this.isEditing) {
//   //     this.dbService.updateRecord('rooms', this.newRoom.id, this.newRoom)
//   //       .subscribe(() => {
//   //         this.fetchData();
//   //         this.cancelEdit();
//   //       }, error => console.error("Update failed:", error));
//   //   } else {
//   //     this.dbService.addRecord('rooms', this.newRoom)
//   //       .subscribe(() => {
//   //         this.fetchData();
//   //         this.cancelEdit();
//   //       }, error => console.error("Add failed:", error));
//   //   }
//   // }
  

//   editRoom(room: any) {
//     this.isEditing = true;
//     this.isAdding = false;
//     this.newRoom = {...room };
//   }

//   // deleteRoom(id: number) {
//   //   if (confirm('Are you sure you want to delete this room?')) {
//   //     this.dbService.deleteRecord('rooms', id)
//   //     .subscribe(() => this.fetchData());
//   //   }
//   // }
//   deleteRoom(id: any) {
//     if (!id) {
//       console.error("Invalid room ID:", id);
//       return;
//     }
//     if (confirm('Are you sure you want to delete this room?')) {
//       this.dbService.deleteRecord('rooms', id).subscribe(
//         () => this.fetchData(),
//         (error) => console.error("Delete failed:", error)
//       );
//     }
//   }
  

//   cancelEdit() {
//     this.isEditing = false;
//     this.isAdding = false;
//     this.newRoom = {};
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../../shared/services/dbservice.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [DbserviceService],
  templateUrl: './admin-rooms.component.html',
  styleUrl: './admin-rooms.component.css'
})
export class AdminRoomsComponent implements OnInit {
  rooms: any[] = [];

  constructor(private dbService: DbserviceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.dbService.getRecord('rooms').subscribe((response: any) => {
      this.rooms = response;
    });
  }

  navigateToAddRoom() {
    this.router.navigate(['/admin/rooms/add']);
  }

  navigateToEditRoom(id: number) {
    this.router.navigate(['/admin/rooms/edit', id]);
  }

  deleteRoom(id: number) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.dbService.deleteRecord('rooms', id).subscribe(
        () => this.fetchData(),
        (error) => console.error('Delete failed:', error)
      );
    }
  }
}
