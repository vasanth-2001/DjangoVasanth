import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DbserviceService } from '../../shared/services/dbservice.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delhi',
  imports: [CommonModule, RouterModule , HttpClientModule],
  providers:[DbserviceService],
  templateUrl: './delhi.component.html',
  styleUrl: './delhi.component.css',
})
export class DelhiComponent implements OnInit {
  @Input() isStandalone: boolean = true;


  cards: any[] = [];
  filteredCards: any[] = [];
  city:string = 'delhi';

  selectedPropertyTypes: string[] = [];
  selectedPriceRange: string = '';
  selectedAvailability: string[] = [];

  constructor(private router: Router , private dbService: DbserviceService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.dbService.getRecord('rooms').subscribe((response:any)=>{
      this.cards = response.filter((room:any)=> room.city === this.city);
      this.filteredCards = [...this.cards];
    })
  }

  applyFilters() {
    this.filteredCards = this.cards.filter(card => {
      const matchesType = this.selectedPropertyTypes.length === 0 || this.selectedPropertyTypes.includes(card.type);

      let matchesPrice = true;
      if (this.selectedPriceRange) {
        if (this.selectedPriceRange === 'low') matchesPrice = card.price < 200;
        else if (this.selectedPriceRange === 'medium') matchesPrice = card.price >= 200 && card.price <= 250;
        else if (this.selectedPriceRange === 'high') matchesPrice = card.price > 250;
      }

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