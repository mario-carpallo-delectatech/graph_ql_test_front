import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_FULL_RESTAURANT } from '../graphql/queries';

@Injectable({
  providedIn: 'root',})
export class ApoloService {
    constructor(private apollo: Apollo) {}

    bearerAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBkZWxlY3RhdGVjaC5jb20iLCJleHAiOjE3NDQwMTAxOTh9.kRbuMdmAu0hR3Dy0oR5_OaEKHl3gFxR1NslLvKxP0rg'
    
    getFullRestaurant(uid: string): Observable<any> {
      return this.apollo.query({
        query: GET_FULL_RESTAURANT,
        variables: { uid },
        context: {
          headers: {
            Authorization: `Bearer ${this.bearerAuth}`
          }
        }
      });
    }

}