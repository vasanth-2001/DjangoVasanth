
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin' },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'User' },
    { id: 3, username: 'jane_doe', email: 'jane@example.com', role: 'User' }
  ];

  editingUser: any = null;
  newUser = { id: 0, username: '', email: '', role: '' };
  isEditing = false;
  isAdding = false;

  constructor() {}

  ngOnInit() {}

  addUser() {
    this.isAdding = true;
    this.isEditing = false;
    this.newUser = { id: 0, username: '', email: '', role: 'User' };
  }

  saveUser() {
    if (this.newUser.id) {
      // Editing existing user
      const index = this.users.findIndex(user => user.id === this.newUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.newUser };
      }
    } else {
      // Adding new user
      this.newUser.id = this.users.length + 1;
      this.users.push({ ...this.newUser });
    }
    this.isAdding = false;
    this.isEditing = false;
    this.newUser = { id: 0, username: '', email: '', role: '' };
  }

  editUser(user: any) {
    this.isEditing = true;
    this.isAdding = false;
    this.newUser = { ...user };
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  cancelEdit() {
    this.isEditing = false;
    this.isAdding = false;
    this.newUser = { id: 0, username: '', email: '', role: '' };
  }
}
