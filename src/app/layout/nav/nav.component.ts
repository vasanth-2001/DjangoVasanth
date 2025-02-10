// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-nav',
//   imports: [RouterLink, CommonModule],
//   templateUrl: './nav.component.html',
//   styleUrl: './nav.component.css'
// })
// export class NavComponent implements OnInit {
//   isLoggedIn: boolean = false;

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     this.checkloginStatus();
//   }

//   checkloginStatus() {
//     if (typeof window !== 'undefined' && !!window.localStorage) {
//       this.isLoggedIn = !!localStorage.getItem('token');
//     }
//   }

//   logout() {
//     if (typeof window !== 'undefined' && !!window.localStorage) {
//       localStorage.removeItem('token');
//     }
//     this.isLoggedIn = false;
//     this.router.navigate(['/login']);
//   }
// }




import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    imports: [RouterLink, CommonModule],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
    isLoggedIn: boolean = false;
    isMobileMenuOpen: boolean = false; // Add property for mobile menu state

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.checkloginStatus();
    }

    checkloginStatus() {
        if (typeof window !== 'undefined' && !!window.localStorage) {
            this.isLoggedIn = !!localStorage.getItem('token');
        }
    }

    logout() {
        if (typeof window !== 'undefined' && !!window.localStorage) {
            localStorage.removeItem('token');
        }
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        this.isMobileMenuOpen = false; // Close mobile menu after logout
    }

    toggleMobileMenu() { // Function to toggle mobile menu
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
}