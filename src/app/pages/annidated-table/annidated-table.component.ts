import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface ReviewsData {
  ratings: {
    Google: {
      rating: number;
      reviews_total: number;
      reviews: {
        '5_stars': number;
        '4_stars': number;
        '3_stars': number;
        '2_stars': number;
        '1_star': number;
      };
      monthly_reviews: number;
      images: number;
    };
    TripAdvisor: {
      rating: number;
      reviews_total: number;
      reviews: {
        '5_stars': number;
        '4_stars': number;
        '3_stars': number;
        '2_stars': number;
        '1_star': number;
      };
      monthly_reviews: number;
      images: number;
      aspects: {
        food: number;
        service: number;
        environment: number;
        quality: number;
      };
    };
  };
}

@Component({
  selector: 'app-annidated-table',
  standalone: true,
  imports: [    
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './annidated-table.component.html',
  styleUrl: './annidated-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AnnidatedTableComponent {
  reviewsData: ReviewsData = {
    "ratings": {
      "Google": {
        "rating": 4.3,
        "reviews_total": 2707,
        "reviews": {
          "5_stars": 1753,
          "4_stars": 507,
          "3_stars": 189,
          "2_stars": 113,
          "1_star": 145
        },
        "monthly_reviews": 45,
        "images": 853
      },
      "TripAdvisor": {
        "rating": 4.0,
        "reviews_total": 325,
        "reviews": {
          "5_stars": 209,
          "4_stars": 43,
          "3_stars": 30,
          "2_stars": 24,
          "1_star": 19
        },
        "monthly_reviews": 0,
        "images": 314,
        "aspects": {
          "food": 4.1,
          "service": 3.9,
          "environment": 3.6,
          "quality": 2.8
        }
      }
    }
  };

  platforms = ['Google', 'TripAdvisor'];
  reviewsExpanded = false;
  aspectsRows = ['Comida', 'Servicio', 'Ambiente', 'Calidad'];
  starRows = [5, 4, 3, 2, 1];
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleReviews() {
    this.reviewsExpanded = !this.reviewsExpanded;
  }

  getStarRating(stars: number): string {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }

  getGoogleValue(key: string): any {
    if (key === 'rating') {
      return this.reviewsData.ratings.Google.rating;
    } else if (key === 'reviews_total') {
      return this.reviewsData.ratings.Google.reviews_total;
    } else if (key === 'monthly_reviews') {
      return this.reviewsData.ratings.Google.monthly_reviews;
    } else if (key === 'images') {
      return this.reviewsData.ratings.Google.images;
    } else if (key === 'food' || key === 'service' || key === 'environment' || key === 'quality') {
      return 'Dato no recopilado';
    } else if (key.includes('_stars') || key === '1_star') {
      return this.reviewsData.ratings.Google.reviews[key as keyof typeof this.reviewsData.ratings.Google.reviews];
    }
    return '';
  }

  getTripAdvisorValue(key: string): any {
    if (key === 'rating') {
      return this.reviewsData.ratings.TripAdvisor.rating;
    } else if (key === 'reviews_total') {
      return this.reviewsData.ratings.TripAdvisor.reviews_total;
    } else if (key === 'monthly_reviews') {
      return this.reviewsData.ratings.TripAdvisor.monthly_reviews;
    } else if (key === 'images') {
      return this.reviewsData.ratings.TripAdvisor.images;
    } else if (key === 'food') {
      return this.reviewsData.ratings.TripAdvisor.aspects.food;
    } else if (key === 'service') {
      return this.reviewsData.ratings.TripAdvisor.aspects.service;
    } else if (key === 'environment') {
      return this.reviewsData.ratings.TripAdvisor.aspects.environment;
    } else if (key === 'quality') {
      return this.reviewsData.ratings.TripAdvisor.aspects.quality;
    } else if (key.includes('_stars') || key === '1_star') {
      return this.reviewsData.ratings.TripAdvisor.reviews[key as keyof typeof this.reviewsData.ratings.TripAdvisor.reviews];
    }
    return '';
  }

  getAspectKey(aspect: string): string {
    const map: { [key: string]: string } = {
      'Comida': 'food',
      'Servicio': 'service',
      'Ambiente': 'environment',
      'Calidad': 'quality'
    };
    return map[aspect];
  }

  getStarsKey(stars: number): string {
    return stars === 1 ? '1_star' : `${stars}_stars`;
  }
}
