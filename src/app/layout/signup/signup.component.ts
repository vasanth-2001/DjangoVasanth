import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { DbserviceService } from '../../shared/services/dbservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone:true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    signupObj: any = {
      firstName: '',
      emailId: '',
      password: '',
      cPassword: ''
    };
    errorMessage: string = ''; // To handle error messages
    private API_BASE_URL = 'http://localhost:8888/api'; // Backend API URL - adjust if needed
  
    constructor(
      private router: Router,
      private http: HttpClient // <-- Inject HttpClient
    ) {}
  
  
    onsignUp() {
      if (this.signupObj.password !== this.signupObj.cPassword) {
        alert("Passwords do not match!");
        return; // Exit if passwords don't match
      }

  console.log("Signup Object being sent:", this.signupObj);
  
      this.http.post(`${this.API_BASE_URL}/user/users/`, this.signupObj) // <-- Use HttpClient.post
        .subscribe({
          next: (response: any) => {
              console.log('Signup successful:', response);
              alert("User Added Successfully!");
              this.router.navigateByUrl("/login");
          },
          error: (error) => {
              console.error('Signup error:', error);
              this.errorMessage = error.error.detail || 'Signup failed. Please try again.'; // More informative error
              alert(this.errorMessage); // Display error message to the user
          }
        });
      }
  
  }

  

  // constructor(private router: Router, public dbService: DbserviceService) {}

  // onsignUp() {
  //   this.dbService.getRecord("users").subscribe((response: any) => {
  //     const users = response || []; // Ensure response is an array
  //     const existingUser = users.filter((user: any) => user.emailId === this.signupObj.emailId);
  
  //     if (existingUser.length > 0) {
  //       alert("Email already exists! Please use a different email.");
  //     } else if (this.signupObj.password !== this.signupObj.cPassword) {
  //       alert("Passwords do not match!");
  //     } else {
  //       this.dbService.addRecord("users", this.signupObj).subscribe(() => {
  //         alert("User Added Successfully!");
  //         this.router.navigateByUrl("/login");
  //       });
  //     }
  //   });
  // }
//   onsignUp() {
//     this.dbService.signup(this.signupObj).subscribe({ // <--- CORRECT: Call dbService.signup()
//         next: (response) => {
//             console.log('Signup successful:', response);
//             alert("User Added Successfully!");
//             this.router.navigateByUrl("/login");
//         },
//         error: (error) => {
//             console.error('Signup error:', error);
//             alert("Signup failed!"); // Basic error handling - improve this later
//         }
//       });
//     }
  
// }
