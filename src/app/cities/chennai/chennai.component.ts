import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DbserviceService } from '../../shared/services/dbservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chennai',
  imports: [FormsModule, CommonModule , RouterModule , HttpClientModule],
  providers:[DbserviceService],
  templateUrl: './chennai.component.html',
  styleUrl: './chennai.component.css',
})
export class ChennaiComponent implements OnInit {
  @Input() isStandalone: boolean = true;

  cards: any[] = [];
  filteredCards: any[] = [];
  city: string = 'chennai';
  
  constructor(private router: Router , public dbService:DbserviceService, private http: HttpClient) {}
  

  selectedPropertyTypes: string[] = [];
  selectedPriceRange: string = '';
  selectedAvailability: string[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    // this.dbService.getRecord('rooms').subscribe((response:any)=>{
    //   this.cards = response.filter((room:any) => room.city === this.city);
    //   this.filteredCards = [...this.cards]; // Initialize filtered cards
    this.http.get("http://127.0.0.1:8888/api/room/rooms/").subscribe((response:any)=>{
      this.cards = response.filter((room:any) => room.city === this.city);
      this.filteredCards = [...this.cards]; // Initialize filtered cards
      
      // console.log(this.cards);
      // console.log(response);
    })
  }

  applyFilters() {
    this.filteredCards = this.cards.filter(card => {
      // Property Type Filter
      const matchesType = this.selectedPropertyTypes.length === 0 || this.selectedPropertyTypes.includes(card.type);

      // Price Range Filter
      let matchesPrice = true;
      if (this.selectedPriceRange) {
        if (this.selectedPriceRange === 'low') matchesPrice = card.price < 200;
        else if (this.selectedPriceRange === 'medium') matchesPrice = card.price >= 200 && card.price <= 250;
        else if (this.selectedPriceRange === 'high') matchesPrice = card.price > 250;
      }

      // Availability Filter
      const matchesAvailability = this.selectedAvailability.length === 0 || this.selectedAvailability.includes(card.availability);

      return matchesType && matchesPrice && matchesAvailability;
    });
  }

  onPropertyTypeChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedPropertyTypes.push(value);
    } else {
      this.selectedPropertyTypes = this.selectedPropertyTypes.filter(type => type !== value);
    }
    this.applyFilters();
  }

  onPriceRangeChange(event: any) {
    this.selectedPriceRange = event.target.value;
    this.applyFilters();
  }

  onAvailabilityChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedAvailability.push(value);
    } else {
      this.selectedAvailability = this.selectedAvailability.filter(availability => availability !== value);
    }
    this.applyFilters();
  }
  
  viewDetails(card: any) {
    this.router.navigate(['/hotel', card.title], { state: { data: card } });
  }
}