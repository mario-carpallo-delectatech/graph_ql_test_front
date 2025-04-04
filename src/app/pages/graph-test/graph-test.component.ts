import { Component } from '@angular/core';
import { ApoloService } from '../../services/apolo.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';
@Component({
  selector: 'app-graph-test',
  standalone: true,
  imports: [ 
    SafePipe,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule  ],
  templateUrl: './graph-test.component.html',
  styleUrl: './graph-test.component.scss'
})
export class GraphTestComponent {
  restaurant: any = null;
  isLoading = true;
  error: string | null = null;
  mapUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private apoloService: ApoloService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const restaurantId = params['id'] || 'c93e584aab52f303d1b101e487eac703cf78abe2';
        return this.apoloService.getFullRestaurant(restaurantId);
      })
    ).subscribe({
      next: (response) => {
        if (response.data && response.data.restaurant) {
          this.restaurant = response.data.restaurant;
          
          // Create Google Maps URL if coordinates are available
          if (this.restaurant.basicData?.geolocation?.coordinates?.latitude && 
              this.restaurant.basicData?.geolocation?.coordinates?.longitude) {
            const lat = this.restaurant.basicData.geolocation.coordinates.latitude;
            const lng = this.restaurant.basicData.geolocation.coordinates.longitude;
            this.mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
          }
          
          this.isLoading = false;
        } else {
          this.handleError('No restaurant data found');
        }
      },
      error: (err) => {
        this.handleError('Error loading restaurant data');
        console.error(err);
      }
    });
  }

  handleError(message: string): void {
    this.error = message;
    this.isLoading = false;
    
    // Configuración mejorada del SnackBar para evitar problemas de estilo
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'] // Añade una clase personalizada
    });
  }

  getWebsiteToDisplay(): string {
    const websites = this.restaurant?.commercial?.contactData?.website;
    if (!websites) return '';
    
    return websites.definitive || 
           websites.google || 
           websites.tripAdvisor || 
           websites.guru || '';
  }

  getEmailToDisplay(): string {
    const emails = this.restaurant?.commercial?.contactData?.email;
    if (!emails) return '';
    
    return emails.definitive || 
           emails.tripAdvisor || 
           emails.guru || '';
  }

  getPhoneToDisplay(): string {
    const phones = this.restaurant?.commercial?.contactData?.telephone;
    if (!phones) return '';
    
    return phones.definitive || 
           phones.google || 
           phones.tripAdvisor || 
           phones.guru || '';
  }

  getFullAddress(): string {
    const address = this.restaurant?.basicData?.address;
    if (!address) return '';
    
    return `${address.streetAddress || ''} ${address.numberAddress || ''}`.trim();
  }
}
