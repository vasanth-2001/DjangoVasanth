import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
// import { DbserviceService } from '../../shared/services/dbservice.service';


@Component({
  selector: 'app-login',
  imports: [RouterModule , RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
// export class LoginComponent {

//   loginObj:any = {
//     "EmailId" : "",
//     "Password":""
//   }
//   userData:any
//   http = inject(HttpClient);

//   constructor( private router: Router, public dbService: DbserviceService ){

//   }

//   onLogin(){
//     this.dbService.getRecord("users").subscribe((response:any) => {
//       // if(response.result){
//         this.userData = response;
//         const currentUser = this.userData.filter((value:any)=>{
//           return value.EmailId === this.loginObj.EmailId && value.Password === this.loginObj.Password
//         })
//         if(currentUser.length > 0){
//         localStorage.setItem('token',currentUser[0].id );
//         alert('Login Success !!')
//         // this.router.navigateByUrl('')
//         const redirectUrl = localStorage.getItem('redirectUrl') || '';
//         localStorage.removeItem('redirectUrl');

//         if(redirectUrl){
//           // this.router.navigateByUrl(redirectUrl);
//           window.location.href=redirectUrl;
//         }
//         else{
//           window.location.href="";
//         }
//       }
//       // }
//       else{
//         alert('Check login credentials !')
//       }
//     })
//   }

// }
export class LoginComponent {
  loginObj: any = {
    emailId: '',
    password: ''
  };
  errorMessage: string = '';
  private API_BASE_URL = 'http://localhost:8888/api'; // Backend API URL - adjust if needed

  constructor(
    private router: Router,
    private http: HttpClient // Inject HttpClient
  ) { }

  onLogin() {
    console.log("Login Object being sent:", this.loginObj);
    this.http.post(`${this.API_BASE_URL}/user/login/`, this.loginObj) // POST to /api/user/login/
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          // Store token (adjust based on your backend response)
          localStorage.setItem('authToken', response.access); // Example: storing access token
          alert("Login Successful!");
          this.router.navigateByUrl("/dashboard"); // Redirect to dashboard or home page
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = error.error.detail || 'Invalid login credentials.'; // More informative error
          alert(this.errorMessage); // Display error message
        }
      });
  }
  navigateTo(page: string) {
    this.router.navigate([`/admin/${page}`]);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin/']); // Navigate to the main admin dashboard route
  }
}
