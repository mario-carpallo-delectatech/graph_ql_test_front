// fragments.ts
import gql from 'graphql-tag';

export const RESTAURANT_BASIC_DATA_FRAGMENT = gql`
  fragment RestaurantBasicData on restaurant {
    basicData {
      address {
        streetAddress
        numberAddress
        googleStreetAddress
      }
      generalInfo {
        name
        description
        restaurantUidentifier
      }
      geolocation {
        geographicDivision {
          postalCode
          postalCodeUidentifier
        }
        coordinates {
          longitude
          latitude
        }
      }
    }
  }
`;

export const RESTAURANT_CONTACT_FRAGMENT = gql`
  fragment RestaurantContact on restaurant {
    commercial {
      contactData {
        website {
          definitive
          google
          tripAdvisor
          guru
        }
        email {
          definitive
          tripAdvisor
          guru
        }
        telephone {
          definitive
          google
          tripAdvisor
          guru
        }
      }
    }
  }
`;